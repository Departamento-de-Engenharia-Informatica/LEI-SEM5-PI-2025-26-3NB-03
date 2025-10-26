using DDDSample1.Domain.Representatives;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.ShippingAgentOrganizations
{
    public class ShippingAgentOrganization : Entity<ShippingAgentOrganizationId>, IAggregateRoot
    {
        public string LegalName { get;  private set; }
        public string AltName { get; private set; }
        public string Address { get; private set; }
        public int TaxNumber { get; private set; }

        private readonly List<Representative> _representatives = new();
        public IReadOnlyCollection<Representative> Representatives => _representatives.AsReadOnly();

        private ShippingAgentOrganization()
        {
        }

        public ShippingAgentOrganization(string legalname, string altname, string address, int taxnumber, List<Representative> representatives)
        {
            if (representatives == null || representatives.Count == 0)
                throw new BusinessRuleValidationException("A Shipping Agent Organization needs at least one Representative.");

            this.Id = new ShippingAgentOrganizationId(Guid.NewGuid());
            this.LegalName = legalname;
            this.AltName = altname;
            this.Address = address;
            this.TaxNumber = taxnumber;

            _representatives.AddRange(representatives);
            foreach (var rep in _representatives)
            {
                rep.ChangeOrganization(this.Id, this);
            }
        }

        public void ChangeLegalName(string legalname)
        {
            this.LegalName = legalname;
        }
        public void ChangeAltName(string altname)
        {
            this.AltName = altname;
        }
        public void ChangeAddress(string address)
        {
            this.Address = address;
        }
        public void ChangeTaxNumber(int taxnumber)
        {
            this.TaxNumber = taxnumber;
        }
        public void ChangeRepresentatives(List<Representative> representatives)
        {
            if (representatives == null || representatives.Count == 0)
                throw new BusinessRuleValidationException("A Shipping Agent Organization needs at least one Representative.");

            _representatives.Clear();
            _representatives.AddRange(representatives);

            foreach (var rep in _representatives)
            {
                rep.ChangeOrganization(this.Id, this);
            }
        }

        public static ShippingAgentOrganization CreateSubmitted(
            string legalname, string altname, string address, int taxnumber, List<Representative> representatives)
            => new(legalname, altname, address, taxnumber, representatives);
    }
}