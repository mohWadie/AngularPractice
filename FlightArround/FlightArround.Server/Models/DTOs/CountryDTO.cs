using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class CountryDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<CityDTO> Cities { get; set; } = new List<CityDTO>();
    }
}
