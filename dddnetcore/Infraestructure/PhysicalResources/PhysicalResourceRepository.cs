using DDDSample1.Domain.PhysicalResources;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Infrastructure.PhysicalResources
{
    public class PhysicalResourceRepository : BaseRepository<PhysicalResource, PhysicalResourceId>, IPhysicalResourceRepository
    {
        private readonly DDDSample1DbContext _context;

        public PhysicalResourceRepository(DDDSample1DbContext context):base(context.PhysicalResources)
        {
            _context = context;
        }

        public new async Task<List<PhysicalResource>> GetAllAsync()
        {
            return await _context.PhysicalResources
                .Include(o => o.Qualifications)
                .ToListAsync();
        }

        public new async Task<PhysicalResource> GetByIdAsync(PhysicalResourceId id)
        {
            return await _context.PhysicalResources
                .Include(o => o.Qualifications)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
