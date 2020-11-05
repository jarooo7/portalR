using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Portal.API.Helpers;
using Portal.API.Models;

namespace Portal.API.Data
{
    public class UserRepository : GenericRepository, IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            Photo photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            User user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastAction).AsQueryable();
            users = users.Where(u => u.Id != userParams.UserId);
            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.UserLikes && !userParams.UserIsLiked)
            {
                var userLikes = await GetUserLikes(userParams.UserId, userParams.UserLikes);
                users = users.Where(u => userLikes.Contains(u.Id));
            }

            if (userParams.UserIsLiked && !userParams.UserLikes)
            {
                var userIsLiked = await GetUserLikes(userParams.UserId, userParams.UserLikes);
                users = users.Where(u => userIsLiked.Contains(u.Id));
            }
            if (userParams.UserIsLiked && userParams.UserLikes)
            {
                var userIsLiked = await GetUserLikes(userParams.UserId);
                users = users.Where(u => userIsLiked.Contains(u.Id));
            }
            if (userParams.MinAge != 18 || userParams.MaxAge != 100)
            {
                var minDate = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDate = DateTime.Today.AddYears(-userParams.MinAge);
                users = users.Where(u => u.DateOfBirth >= minDate && u.DateOfBirth <= maxDate);
            }
            if (userParams.City != "")
            {
                users = users.Where(u => u.City.ToUpper() == userParams.City.ToUpper());
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    case "age":
                        users = users.OrderByDescending(u => u.DateOfBirth);
                        break;
                    case "userName":
                        users = users.OrderBy(u => u.UserName);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastAction);
                        break;
                }
            }

            return await PagedList<User>.CreateListAsync(users, userParams.pageNumber, userParams.PageSize);
        }
        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.isMain);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.userLikesId == userId && u.userIsLikedId == recipientId);
        }
        private async Task<IEnumerable<int>> GetUserLikes(int id, bool userLikes)
        {
            var user = await _context.Users
                                .Include(x => x.UserLikes)
                                .Include(x => x.UserIsLiked)
                                .FirstOrDefaultAsync(u => u.Id == id);

            if (userLikes)
            {
                return user.UserLikes.Where(u => u.userIsLikedId == id).Select(i => i.userLikesId);
            }
            else
            {
                return user.UserIsLiked.Where(u => u.userLikesId == id).Select(i => i.userIsLikedId);
            }
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id)
        {
            var user = await _context.Users
                                .Include(x => x.UserLikes)
                                .Include(x => x.UserIsLiked)
                                .FirstOrDefaultAsync(u => u.Id == id);


            var like1 = user.UserLikes.Where(u => u.userIsLikedId == id).Select(i => i.userLikesId);

            var like2 = user.UserIsLiked.Where(u => u.userLikesId == id).Select(i => i.userIsLikedId);
            List<int> like = new List<int>();
            foreach (var l1 in like1)
            {
                foreach (var l2 in like2)
                {
                    if (l1 == l2)
                    {
                        like.Add(l1);
                    }
                }

            }
            return like;

        }

        public async Task<Message> GetMsg(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMsgsForUser(MessageParams messageParams)
        {
            var messages = _context.Messages.Include(u => u.Sender).ThenInclude(p => p.Photos)
                                           .Include(u => u.Recipient).ThenInclude(p => p.Photos).AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId && u.SenderDeleted == false);
                    break;
                case "NonRead":
                 messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.IsRead == false && u.RecipientDeleted == false);
                    break;
                default:
                    var messages2 = messages.Where(u => (u.SenderId == messageParams.UserId || u.RecipientId == messageParams.UserId) &&
                        u.SenderDeleted == false).GroupBy(u => u.SenderId == messageParams.UserId ? u.RecipientId : u.SenderId)
                        .Select( i => i.Max(u => u.DateSent));
                    messages = messages.Where(u => messages2.Contains(u.DateSent));

                    break;
            }


            messages = messages.OrderByDescending(d => d.DateSent);

            return await PagedList<Message>.CreateListAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMsgsThred(int userId, int recipientId)
        {
            var messages = await _context.Messages
                               .Include(u => u.Sender).ThenInclude(p => p.Photos)
                               .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                               .Where(m => m.RecipientId == userId && m.SenderId == recipientId && m.RecipientDeleted == false
                                   || m.RecipientId == recipientId && m.SenderId == userId && m.SenderDeleted == false)
                               .OrderByDescending(m => m.DateSent)
                               .ToListAsync();
            return messages;
        }
    }
}