using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class Travel
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public Guid FromId { get; set; }
        public virtual City From { get; set; }
        [Required]
        public Guid ToId { get; set; }
        public virtual City To { get; set; }
        [Required]
        public DateTime TravelDate { get; set; }
        public DateTime TravelTime { get; set; }
        public DateTime ArriveTime { get; set; }
        public int AvailableSeats { get; set; }
        [Required]
        public double Price { get; set; }
    }
}
