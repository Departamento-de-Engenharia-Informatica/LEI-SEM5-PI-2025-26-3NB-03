using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ShippingAgentOrganizations
{
    public interface IShippingAgentOrganizationRepository : IRepository<ShippingAgentOrganization, ShippingAgentOrganizationId>
    {
    }
}