using System;
using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.Representatives
{
    public class RepresentativeDto
    {
        public Guid Id { get; set; }

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
    }
}