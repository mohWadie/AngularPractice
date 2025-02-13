using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class Ticket
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public Travel Travel { get; set; }
        [Required]
        public Customers Customer { get; set; }
        public TicketType Type { get; set; } = TicketType.Economy;
        public bool Approved { get; set; } = false;
        public double ToPay { get; set; }
    }
    public enum TicketType
    {
        Economy,
        Premium,
        Business
    }
}
