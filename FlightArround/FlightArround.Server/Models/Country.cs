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
        public virtual ICollection<City> Cities { get; set; } = new List<City>();

        public CountryDTO GetDto()
        {
            return new CountryDTO
            {
                Id = this.Id,
                Name = this.Name,
                Cities = this.Cities.Select(static x => new CityDTO
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToList()
            };
        }
    }
}
