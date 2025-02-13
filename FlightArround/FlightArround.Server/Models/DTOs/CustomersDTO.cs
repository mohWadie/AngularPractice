namespace FlightArround.Server.Models.DTOs
{
    public class CustomersDTO
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => this.FirstName + " " + this.LastName;
        public string Phone { get; set; }
        public string PassportNo { get; set; }
        public DateTime DOB { get; set; }
    }
}
