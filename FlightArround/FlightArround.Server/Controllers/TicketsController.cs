using FlightArround.Server.Data;
using FlightArround.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using YamlDotNet.Serialization;

namespace FlightArround.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly FlightArroundContext _context;
        private readonly ILogger<TicketsController> _logger;

        public TicketsController(FlightArroundContext context, ILogger<TicketsController> logger) 
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult> Get()
        {
            try 
            {
                var tempId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
                if (tempId == null) return Unauthorized();

                var id = Guid.Parse(tempId);

                var res = await _context.Tickets.Where(x => x.Customer.Id == id).ToListAsync();
                return Ok(res);
            }
            catch (Exception ex)
            {
                var logError = $"{DateTime.Now:dd/MM/yyyy HH:mm:ss} - {ex.Message}";
                _logger.Log(LogLevel.Error, logError);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        async public Task<ActionResult> Create([FromBody] Ticket tic)
        {
            var tempId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            if (tempId == null) return Unauthorized();

            var id = Guid.Parse(tempId);
            try
            {
                var cust = await _context.Customers.FindAsync(id);
                tic.Id = Guid.NewGuid();
                tic.Customer = cust!;
                tic.ToPay = tic.Travel.Price + ((int)tic.Type * 500);
                await _context.Tickets.AddAsync(tic);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                var logError = $"{DateTime.Now:dd/MM/yyyy HH:mm:ss} - {ex.Message}";
                _logger.Log(LogLevel.Error, logError);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("[action]")]
        [Authorize]
        async public Task<ActionResult> Approve([FromQuery] Guid id)
        {
            var tempId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            if (tempId == null) return Unauthorized();

            var userId = Guid.Parse(tempId);
            if (userId != id) return Unauthorized();
            try
            {
                var tick = await _context.Tickets.FindAsync(id);
                tick!.Approved = true;
                _context.Tickets.Update(tick);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                var logError = $"{DateTime.Now:dd/MM/yyyy HH:mm:ss} - {ex.Message}";
                _logger.Log(LogLevel.Error, logError);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
