using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class Travel
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public City From { get; set; }
        [Required]
        public City To { get; set; }
        [Required]
        public DateTime TravlDate { get; set; }
        public DateTime TravlTime { get; set; }
        public DateTime ArriveTime { get; set; }
        public int AvailableSeats { get; set; }
        [Required]
        public double Price { get; set; }
    }
}
