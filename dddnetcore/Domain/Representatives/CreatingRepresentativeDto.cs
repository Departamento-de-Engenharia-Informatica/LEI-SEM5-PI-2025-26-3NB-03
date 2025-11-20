using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.Representatives
{
    public class CreatingRepresentativeDto
    {
        [Required(ErrorMessage = "Citizen ID is required.")]
        public string Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Nationality is required.")]
        public string Nationality { get; set; }

        [Required(ErrorMessage = "E-mail is required.")]
        [EmailAddress(ErrorMessage = "Invalid E-mail format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Phone number must be a positive integer.")]
        public int PhoneNumber { get; set; }

        public CreatingRepresentativeDto(string id, string name, string nationality, string email, int phonenumber)
        {
            this.Id = id;
            this.Name = name;
            this.Nationality = nationality;
            this.Email = email;
            this.PhoneNumber = phonenumber;
        }
    }
}