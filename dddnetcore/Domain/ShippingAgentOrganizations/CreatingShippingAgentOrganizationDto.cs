using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.ShippingAgentOrganizations
{
    public class CreatingShippingAgentOrganizationDto
    {
        public string LegalName { get; set; }
        public string AltName { get; set; }
        public string Address { get; set; }
        public int TaxNumber { get; set; }
        public List<Guid> Representatives { get; set; }

        public CreatingShippingAgentOrganizationDto(string legalname, string altname, string address, int taxnumber, List<Guid> representatives)
        {
            this.LegalName = legalname;
            this.AltName = altname;
            this.Address = address;
            this.TaxNumber = taxnumber;
            this.Representatives = representatives;
        }
    }
}