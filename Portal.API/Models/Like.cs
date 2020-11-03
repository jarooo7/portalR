using System;
using System.Threading.Tasks;

namespace Portal.API.Models
{
    public class Like
    {
        public int userLikesId { get; set; }//użytkownik lubi
        public int userIsLikedId { get; set; }//użytkonik który jest lubiany
        public User userLikes { get; set; }
        public User userIsLiked{ get; set; }

        public static implicit operator Task<object>(Like v)
        {
            throw new NotImplementedException();
        }
    }
}