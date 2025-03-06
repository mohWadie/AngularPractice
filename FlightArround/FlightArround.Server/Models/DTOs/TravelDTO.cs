using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class TravelDTO
    {
        public Guid? Id { get; set; }
        public Guid FromId { get; set; }
        public Guid ToId { get; set; }
        public string? FromCity { get; set; }
        public string? ToCity { get; set; }
        public string? FromCountry { get; set; }
        public string? ToCountry { get; set; }
        public DateTime TravelDate { get; set; }
        public DateTime TravelTime { get; set; }
        public DateTime ArriveTime { get; set; }
        public int AvailableSeats { get; set; }
        [Required]
        public double Price { get; set; }

        public Travel GetTravel()
        {
            return new Travel
            {
                ArriveTime = ArriveTime,
                Price = Price,
                FromId = FromId,
                ToId = ToId,
                AvailableSeats = AvailableSeats,
                TravelDate = TravelDate,
                TravelTime = TravelTime
            };
        }
    }
}
