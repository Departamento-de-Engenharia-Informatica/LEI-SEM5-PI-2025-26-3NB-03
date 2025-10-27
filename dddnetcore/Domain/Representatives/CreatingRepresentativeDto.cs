using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.Representatives
{
    public class CreatingRepresentativeDto
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Nationality { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
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