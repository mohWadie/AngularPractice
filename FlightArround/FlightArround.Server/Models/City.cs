using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class City
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public Country Country { get; set; } = null!;
    }
}
