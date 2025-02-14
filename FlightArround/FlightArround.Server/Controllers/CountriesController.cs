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
    public class CountriesController : ControllerBase
    {
        private readonly FlightArroundContext _context;
        private readonly ILogger<CountriesController> _logger;

        public CountriesController(FlightArroundContext context, ILogger<CountriesController> logger) 
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<ActionResult> Country(Guid id)
        {
            try
            {
                var res = await _context.Countries.FirstOrDefaultAsync(c => c.Equals(id));
                return Ok(res);
            }
            catch (Exception ex)
            {
                var logError = $"{DateTime.Now:dd/MM/yyyy HH:mm:ss} - {ex.Message}";
                _logger.Log(LogLevel.Error, logError);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<ActionResult> AllCountries()
        {
            try 
            { 
                var res = await _context.Countries.ToListAsync();
                ICollection<CountryDTO> countries = [];

                foreach (Country country in res) 
                {
                    countries.Add(country.GetDto());
                }
                return Ok(countries.AsEnumerable());
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
        async public Task<ActionResult> Create(CountryDTO country)
        {
            try
            {
                var countryExists = await _context.Countries.AnyAsync(c => c.Name == country.Name);
                if (countryExists) return Conflict("Country already exists.");

                Country ctry = new()
                {
                    Id = Guid.NewGuid(),
                    Name = country.Name
                };
                var cities = country.Cities.Select(c => new City { Id = Guid.NewGuid(), countryId = ctry.Id, Name = c.Name }).ToList();

                ctry.Cities = cities;
                
                await _context.Countries.AddAsync(ctry);
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
     
        [HttpPost]
        [Authorize]
        public ActionResult Delete()
        {
            //MANAGE this endpoint later.
            return Ok();
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }
    }
}
