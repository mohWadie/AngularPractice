using FlightArround.Server.Data;
using FlightArround.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YamlDotNet.Serialization;

namespace FlightArround.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TravelsController : ControllerBase
    {
        private readonly FlightArroundContext _context;
        private readonly ILogger<TravelsController> _logger;

        public TravelsController(FlightArroundContext context, ILogger<TravelsController> logger) 
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
            var res = await _context.Countries.ToListAsync();
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
        async public Task<ActionResult> Create([FromBody] Travel travel)
        {
            try
            {
                if (travel.Price <= 0) return BadRequest("Missing travel price");

                travel.Id = Guid.NewGuid();
                await _context.Travels.AddAsync(travel);
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
