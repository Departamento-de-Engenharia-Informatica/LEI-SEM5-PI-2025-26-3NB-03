using DDDSample1.Domain.PhysicalResources;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<PhysicalResource> GetByCodeAsync(string code)
        {
            return await _context.PhysicalResources
                .Include(o => o.Qualifications)
                .FirstOrDefaultAsync(o => o.Code == code);
        }

        public async Task<List<PhysicalResource>> SearchAsync(
            string code = null,
            string description = null,
            string type = null,
            string availabilityStatus = null)
        {
            var query = _context.PhysicalResources
                .Include(o => o.Qualifications)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(code))
                query = query.Where(r => r.Code.Contains(code));

            if (!string.IsNullOrWhiteSpace(description))
                query = query.Where(r => r.Description.Contains(description));

            if (!string.IsNullOrWhiteSpace(type))
                query = query.Where(r => r.Type.Contains(type));

            if (!string.IsNullOrWhiteSpace(availabilityStatus))
                query = query.Where(r => r.AvailabilityStatus.Contains(availabilityStatus));

            return await query.ToListAsync();
        }
    }
}
