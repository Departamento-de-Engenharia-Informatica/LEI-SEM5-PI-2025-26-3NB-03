using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.ShippingAgentOrganizations
{
    public class UpdateShippingAgentOrganizationDto
    {
        [Required]
        public string LegalName { get; set; }

        [Required]
        public string AltName { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public int TaxNumber { get; set; }

        public List<string> Representatives { get; set; }
    }
}