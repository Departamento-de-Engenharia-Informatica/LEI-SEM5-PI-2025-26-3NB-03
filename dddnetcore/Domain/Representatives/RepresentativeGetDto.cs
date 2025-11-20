namespace DDDSample1.Domain.Representatives
{
    public class RepresentativeGetDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Nationality { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public string ShippingAgentOrganizationId { get; set; }
        public bool Active { get; set; }
    }
}