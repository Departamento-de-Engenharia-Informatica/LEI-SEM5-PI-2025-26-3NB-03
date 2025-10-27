using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.ShippingAgentOrganizations
{
    public class CreatingShippingAgentOrganizationDto
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

        public CreatingShippingAgentOrganizationDto(string legalname, string altname, string address, int taxnumber, List<string> representatives)
        {
            this.LegalName = legalname;
            this.AltName = altname;
            this.Address = address;
            this.TaxNumber = taxnumber;
            this.Representatives = representatives;
        }
    }
}