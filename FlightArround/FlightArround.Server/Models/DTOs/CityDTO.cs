using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class CityDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
