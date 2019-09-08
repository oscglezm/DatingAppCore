using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.APIa.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.APIa.DAL
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext context;

        public AuthRepository( DataContext context)
        {
            this.context = context;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computerHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for(int i=0; i< computerHash.Length; i++)
                {
                    if (computerHash[i] != computerHash[i])
                        return false;
                }
            }

            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                passwordSalt = hmac.Key;
            }
        }

        public async Task<bool> UsersExists(string username)
        {
            bool isUser = await context.Users.AnyAsync(x => x.Username == username);

            return isUser == true;

        }
    }
}
