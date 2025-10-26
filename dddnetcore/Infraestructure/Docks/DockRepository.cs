using DDDSample1.Domain.Docks;
using DDDSample1.Domain.VesselTypes;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDSample1.Infrastructure.Docks
{
    public class DockRepository : BaseRepository<Dock, DockId>, IDockRepository
    {
        private readonly DDDSample1DbContext _context;

        public DockRepository(DDDSample1DbContext context) : base(context.Docks)
        {
            _context = context;
        }

        public async Task<List<Dock>> GetByNameAsync(string name)
        {
            return await _context.Docks
                .Include(d => d.VesselTypes)
                .Where(d => d.Name.ToLower().Contains(name.ToLower()))
                .ToListAsync();
        }

        public async Task<List<Dock>> GetByLocationAsync(string location)
        {
            return await _context.Docks
                .Include(d => d.VesselTypes)
                .Where(d => d.Location.ToLower().Contains(location.ToLower()))
                .ToListAsync();
        }

        public async Task<List<Dock>> GetByVesselTypeAsync(VesselTypeId vesselTypeId)
        {
            return await _context.Docks
                .Include(d => d.VesselTypes)
                .Where(d => d.VesselTypes.Any(v => v.Id == vesselTypeId))
                .ToListAsync();
        }
    }
}
