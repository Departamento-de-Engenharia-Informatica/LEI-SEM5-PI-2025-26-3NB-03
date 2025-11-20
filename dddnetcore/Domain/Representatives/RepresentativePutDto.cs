using System;
using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.Representatives
{
    public class RepresentativeUpdateDto
    {
        public string Name { get; set; }

        public string Nationality { get; set; }

        [EmailAddress(ErrorMessage = "Invalid E-mail format.")]
        public string Email { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Phone number must be a positive integer.")]
        public int PhoneNumber { get; set; }
    }
}