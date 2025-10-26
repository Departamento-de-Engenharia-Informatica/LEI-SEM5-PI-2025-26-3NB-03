using DDDSample1.Domain.ShippingAgentOrganizations;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Infrastructure.ShippingAgentOrganizations
{
    public class ShippingAgentOrganizationRepository : BaseRepository<ShippingAgentOrganization, ShippingAgentOrganizationId>, IShippingAgentOrganizationRepository
    {
        private readonly DDDSample1DbContext _context;

        public ShippingAgentOrganizationRepository(DDDSample1DbContext context):base(context.ShippingAgentOrganizations)
        {
            _context = context;
        }

        public new async Task<List<ShippingAgentOrganization>> GetAllAsync()
        {
            return await _context.ShippingAgentOrganizations
                .Include(o => o.Representatives)
                .ToListAsync();
        }

        public new async Task<ShippingAgentOrganization> GetByIdAsync(ShippingAgentOrganizationId id)
        {
            return await _context.ShippingAgentOrganizations
                .Include(o => o.Representatives)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}