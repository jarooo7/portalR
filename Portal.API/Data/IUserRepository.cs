using System.Collections.Generic;
using System.Threading.Tasks;
using Portal.API.Models;

namespace Portal.API.Data
{
    public interface IUserRepository:IGenericRepository
    {
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }

}