using FlightArround.Server.Models.DTOs;
using System.ComponentModel.DataAnnotations;

namespace FlightArround.Server.Models
{
    public class Customers : Models.User
    {
        public Guid Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string FullName => this.FirstName + " " + this.LastName;
        public string Phone { get; set; }
        [Required]
        public string PassportNo { get; set; }
        [Required]
        public DateTime DOB { get; set; }


        public CustomersDTO GetCustomerDTO()
        {
            return new CustomersDTO
            {
                FirstName = FirstName,
                LastName = LastName,
                DOB = DOB,
                Phone = Phone,
                PassportNo = PassportNo,
                Email = Email,
                Id = Id,
                RegistrationDate = RegistrationDate,
                UserName = UserName
            };
        }
    }
}
