using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ShippingAgentOrganizations;
using System.Net.Mail;

namespace DDDSample1.Domain.Representatives
{
    public class Representative : Entity<RepresentativeId>, IAggregateRoot
    {
        public string Name { get;  private set; }
        public string Nationality { get; private set; }
        public string Email { get; private set; }
        public int PhoneNumber { get; private set; }
        public ShippingAgentOrganization ShippingAgentOrganization { get; private set; }
        public ShippingAgentOrganizationId ShippingAgentOrganizationId { get; private set; }

        public bool Active{ get;  private set; }

        private Representative()
        {
            this.Active = true;
        }

        public Representative(RepresentativeId id, string name, string nationality, string email, int phonenumber)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name is required.");
            if (string.IsNullOrWhiteSpace(nationality))
                throw new BusinessRuleValidationException("Nationality is required.");
            if (string.IsNullOrWhiteSpace(email))
                throw new BusinessRuleValidationException("E-mail is required.");
            try
            {
                var addr = new MailAddress(email);
            }
            catch
            { 
                throw new BusinessRuleValidationException("E-mail format is invalid.");
            }
            if (phonenumber <= 0)
                throw new BusinessRuleValidationException("Phone number must be a positive integer.");

            this.Id = id ?? throw new BusinessRuleValidationException("Representative ID is required.");
            this.Name = name;
            this.Nationality = nationality;
            this.Email = email;
            this.PhoneNumber = phonenumber;
            this.Active = true;
        }

        public void ChangeName(string name)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the name to an inactive representative.");
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name is required.");
            this.Name = name;
        }
        public void ChangeNationality(string nationality)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the nationality to an inactive representative.");
            if (string.IsNullOrWhiteSpace(nationality))
                throw new BusinessRuleValidationException("Nationality is required.");
            this.Nationality = nationality;
        }
        public void ChangeEmail(string email)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the e-mail to an inactive representative.");
            if (string.IsNullOrWhiteSpace(email))
                throw new BusinessRuleValidationException("Email is required.");
            try
            {
                var addr = new MailAddress(email);
            }
            catch
            {
                throw new BusinessRuleValidationException("E-mail format is invalid.");
            }
            this.Email = email;
        }
        public void ChangePhoneNumber(int phonenumber)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the phone number to an inactive representative.");
            if (phonenumber <= 0)
                throw new BusinessRuleValidationException("Phone number must be a positive integer.");
            this.PhoneNumber = phonenumber;
        }
        public void ChangeOrganization(ShippingAgentOrganizationId organizationId, ShippingAgentOrganization organization)
        {
            this.ShippingAgentOrganizationId = organizationId;
            this.ShippingAgentOrganization = organization;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public static Representative CreateSubmitted(
            RepresentativeId id, string name, string nationality, string email, int phonenumber)
            => new(id, name, nationality, email, phonenumber);
    }
}