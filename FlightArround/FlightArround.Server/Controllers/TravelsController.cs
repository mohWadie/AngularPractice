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
        public async Task<ActionResult> Get()
        {
            try 
            {
                var today = DateTime.UtcNow;
                var res = await _context.Travels
                    .Include(t => t.From).ThenInclude(t => t.Country)
                    .Include(t => t.To).ThenInclude(t => t.Country)
                    //.Where(t => t.TravelDate >= today)
                    .Select(
                        t => new TravelDTO
                        {
                            Id = t.Id,
                            FromId = t.FromId,
                            ToId = t.ToId,
                            FromCity = t.From.Name,
                            ToCity = t.To.Name,
                            FromCountry = t.From.Country.Name,
                            ToCountry = t.To.Country.Name,
                            AvailableSeats = t.AvailableSeats,
                            ArriveTime = t.ArriveTime,
                            Price = t.Price,
                            TravelDate = t.TravelDate,
                            TravelTime = t.TravelTime
                        }
                    ).ToListAsync();
                return Ok(res.AsEnumerable());
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
        async public Task<ActionResult> Create([FromBody] TravelDTO travel)
        {
            try
            {
                if (travel.Price <= 0) return BadRequest("Missing travel price");
                if (travel.TravelTime < DateTime.UtcNow) return BadRequest("Invalid travel date");
                if (travel.TravelTime > travel.ArriveTime) return BadRequest("Invalid arrive time");
                if (travel.FromId == travel.ToId) return BadRequest("Departure and destination cities must be different");

                var trv = travel.GetTravel();
                trv.Id = Guid.NewGuid();
                await _context.Travels.AddAsync(trv);
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
