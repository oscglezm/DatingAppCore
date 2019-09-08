
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;
using DatingApp.APIa.DAL;
using DatingApp.APIa.Dtos;
using DatingApp.APIa.Models;
using Microsoft.AspNetCore.Mvc;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt; //missing this reference on the vscode
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using System;

namespace DatingApp.APIa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    { 
        private readonly IAuthRepository repo;
        private readonly IConfiguration config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            this.repo = repo;
            this.config = config;
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> Register( UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if(await repo.UsersExists(userForRegisterDto.Username))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var createdUser = await repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLogin)
        {
            var userFromRepo = await repo.Login(userForLogin.Username.ToLower(), userForLogin.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            }
            );
        }


    }
}