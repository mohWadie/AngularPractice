using FlightArround.Server.Data;
using FlightArround.Server.Models;
using FlightArround.Server.Models.DTOs;
using FlightArround.Server.Services;
using k8s.KubeConfigModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;

namespace FlightArround.Server.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {

        private readonly ILogger<AuthController> _logger;

        public readonly FlightArroundContext _context;

        private readonly TokenProvider _tokenProvider;

        public AuthController(FlightArroundContext context, ILogger<AuthController> logger, TokenProvider tokenProvider)
        {
            _logger = logger;
            _context = context;
            _tokenProvider = tokenProvider;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Signup([FromBody] CustomersDTO customer)
        {
            if (customer == null) return BadRequest();

            try
            {
                var emailExists = _context.Customers.Any(e => e.Email == customer.Email);
                if (emailExists) return Conflict("Email already exists");

                var userNameExists = _context.Customers.Any(e => e.UserName == customer.UserName);
                if (userNameExists) return Conflict("User name already exists");

                var passportExists = _context.Customers.Any(e => e.PassportNo == customer.PassportNo);
                if (passportExists) return Conflict("Passport number already exists");

                customer.Id = Guid.NewGuid();
                var _rgn = RandomNumberGenerator.Create();
                byte[] hashedPasss = SecurePassword.HashPasswordV2(customer.Password, _rgn);
                customer.Password = "********";

                Customers cust = new Customers 
                { 
                    Id = Guid.NewGuid(),
                    FirstName = customer.FirstName,
                    LastName = customer.LastName,
                    Email = customer.Email,
                    UserName = customer.UserName,
                    PassportNo = customer.PassportNo,
                    Password = hashedPasss,
                    DOB = customer.DOB,
                    Phone = customer.Phone,
                    RegistrationDate = DateTime.Now.ToUniversalTime()
                };

                await _context.Customers.AddAsync(cust);
                await _context.SaveChangesAsync();

                customer.Id = cust.Id;
                return Ok(customer);
            }
            catch (Exception ex) 
            {
                var logError = $"{DateTime.Now:dd/MM/yyyy HH:mm:ss} - {ex.Message}";
                _logger.Log(LogLevel.Error, logError);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Signin([FromBody] UserModelDTO user)
        {
            if (user == null) return Unauthorized();

            try
            {
                if (user.userName != "admin")
                {

                    var userExists = await _context.Customers.FirstOrDefaultAsync(e => e.Email == user.userName || e.UserName == user.userName);
                    if (userExists == null) return Unauthorized("User name or password is incorrect");

                    var passVarification = SecurePassword.VerifyHashedPasswordV2(userExists.Password, user.password);
                    if (!passVarification) return Unauthorized("User name or password is incorrect");

                    var cust = userExists.GetCustomerDTO()!;
                    var jwt = _tokenProvider.Craete(userExists)!;


                    return Ok(new { user = cust, token = jwt });
                }
                else
                {
                    var admin = await RegisterAdmin();
                    if (admin == null) return Unauthorized();

                    var passVarification = SecurePassword.VerifyHashedPasswordV2(admin.Password!, user.password);
                    if (!passVarification) return Unauthorized("User name or password is incorrect");

                    var jwt = _tokenProvider.Craete(admin)!;
                    admin.Password = null;

                    return Ok(new { user = admin, token = jwt });
                }
            }
            catch (Exception ex)
            {
                var logError = $"{DateTime.Now:dd/MM/yyyy HH:mm:ss} - {ex.Message}";
                _logger.Log(LogLevel.Error, logError);
                return StatusCode(500, ex.Message);
            }
        }

        private async Task<Models.User?> RegisterAdmin()
        {
            try
            {
                var emailExists = await _context.Users.FirstOrDefaultAsync(e => e.Email == "admin" || e.UserName == "admin");
                if (emailExists != null) return emailExists;

                Models.User admin = new Models.User() 
                { 
                    Id = Guid.NewGuid(),
                    UserName = "admin",
                    Email = "admin",
                    RegistrationDate = DateTime.Now.ToUniversalTime()
                };

                var _rgn = RandomNumberGenerator.Create();
                byte[] hashedPasss = SecurePassword.HashPasswordV2("admin", _rgn);
                admin.Password = hashedPasss;

                await _context.Users.AddAsync(admin);
                await _context.SaveChangesAsync();
                return admin;
            }
            catch (Exception ex)
            {
                var logError = $"{DateTime.Now:dd/MM/yyyy HH:mm:ss} - {ex.Message}";
                _logger.Log(LogLevel.Error, logError);
                return null;
            }
        }

    }
}
