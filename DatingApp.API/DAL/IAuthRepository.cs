using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.DAL
{
    public interface IAuthRepository
    {
         Task<User> Register( User user, string password);

         Task<User> Login( string username, string password);

         Task<bool> UsersExists( string username);
    }
}