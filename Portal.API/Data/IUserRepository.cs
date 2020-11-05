using System.Collections.Generic;
using System.Threading.Tasks;
using Portal.API.Helpers;
using Portal.API.Models;

namespace Portal.API.Data
{
    public interface IUserRepository:IGenericRepository
    {
         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhotoForUser(int userId);
         Task<Like> GetLike(int userId, int recipientId);
         Task<Message> GetMsg(int id);
         Task<PagedList<Message>> GetMsgsForUser(MessageParams messageParams);
         Task<IEnumerable<Message>> GetMsgsThred(int userId, int recipientId);
    }

}