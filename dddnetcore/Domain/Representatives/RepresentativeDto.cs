using System;

namespace DDDSample1.Domain.Representatives
{
    public class RepresentativeDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Nationality { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
    }
}