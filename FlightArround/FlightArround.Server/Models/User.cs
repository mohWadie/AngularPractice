using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class User
    {
        public User() { }

        [Key]
        public Guid Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public byte[]? Password { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime EditDate { get; set; }

    }
}
