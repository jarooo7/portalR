using System.Threading.Tasks;
using Portal.API.Models;

namespace Portal.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Login(string userName, string password);
         Task<User> Register(User user, string password);
          Task<bool> UserExists(string userName);
    }
}