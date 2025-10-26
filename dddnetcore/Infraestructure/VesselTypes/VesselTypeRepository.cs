using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.VesselTypes;
using DDDSample1.Domain.Shared;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.VesselTypes
{
    public class VesselTypeRepository : BaseRepository<VesselType, VesselTypeId>, IVesselTypeRepository
    {
        private readonly DDDSample1DbContext _context;
        private readonly DbSet<VesselType> _vesselTypes;

        public VesselTypeRepository(DDDSample1DbContext context) : base(context.VesselTypes)
        {
            _context = context;
            _vesselTypes = context.VesselTypes;
        }

        public async Task<VesselType> GetByIdAsync(VesselTypeId id)
        {
            return await _vesselTypes
                .FirstOrDefaultAsync(v => v.Id.Value == id.Value);
        }

        public async Task<VesselType> GetByNameAsync(string name)
        {
            return await _vesselTypes
                .FirstOrDefaultAsync(v => v.Name.ToLower() == name.ToLower());
        }

        public async Task<VesselType> GetByDescriptionAsync(string description)
        {
            return await _vesselTypes
                .FirstOrDefaultAsync(v => v.Description.ToLower() == description.ToLower());
        }

        public async Task<List<VesselType>> GetByIdsAsync(List<VesselTypeId> ids)
        {
            var guids = ids.Select(i => i.Value).ToList();
            return await _vesselTypes
                .Where(v => guids.Contains(v.Id.Value))
                .ToListAsync();
        }
    }
}
