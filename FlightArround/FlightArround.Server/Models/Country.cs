using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class Country
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool MarkAsDeleted { get; set; }
        public ICollection<City> Cities { get; set; } = new List<City>();
    }
}
