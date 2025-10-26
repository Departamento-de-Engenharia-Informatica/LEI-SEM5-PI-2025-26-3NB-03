using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.ShippingAgentOrganizations
{
    public class ShippingAgentOrganizationDto
    {
        public Guid Id { get; set; }

        public string LegalName { get; set; }
        public string AltName { get; set; }
        public string Address { get; set; }
        public int TaxNumber { get; set; }
        public List<Guid> Representatives { get; set; }
    }
}