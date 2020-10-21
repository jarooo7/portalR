using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using Portal.API.Models;

namespace Portal.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
           _context = context;

        }

        public void SeedUsers(){

            if (!_context.Users.Any())
            {
            var userDate=File.ReadAllText("Data/UserSeedData.json");
            List<User> users = JsonConvert.DeserializeObject<List<User>>(userDate);

            foreach (var user in users)
            {
            byte[] passwordHash,passwordSalt;
            CreatePaswordHashSald("password",out passwordHash,out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt =passwordSalt;
             user.UserName =user.UserName.ToLower();
             _context.Users.Add(user);
            }
            _context.SaveChanges();
            }
        }
           private void CreatePaswordHashSald(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            };
        }

    }
}