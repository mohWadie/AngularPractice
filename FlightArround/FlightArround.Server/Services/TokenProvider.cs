using FlightArround.Server.Models;
using FlightArround.Server.Models.DTOs;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace FlightArround.Server.Services
{
    public sealed class TokenProvider(IConfiguration configration)
    {
        public string Craete(Models.User user)
        {
            var secretKey = configration["Jwt:Secret"]!;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha256);

            var identity = new ClaimsIdentity([
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            ]);

            SecurityTokenDescriptor tokenDescriptor = new()
            {
                Subject = identity,
                Expires = DateTime.UtcNow.AddDays(50),
                SigningCredentials = credentials,
                Issuer = configration["Jwt:Issuer"],
                Audience = configration["Jwt:Audience"],
            };

            var handler = new JsonWebTokenHandler();

            string token = handler.CreateToken(tokenDescriptor);
            return token;

        }
    }
}
