using DDDSample1.Domain.VesselTypes;
using DDDSample1.Infrastructure.Shared;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DDDSample1.Infrastructure.VesselTypes
{
    public class VesselTypeRepository : BaseRepository<VesselType, VesselTypeId>, IVesselTypeRepository
    {

        private readonly DDDSample1DbContext _context;

        public VesselTypeRepository(DDDSample1DbContext context) : base(context.VesselTypes)
        {
            _context = context;

        }
        
        public async Task<VesselType> GetByNameAsync(string name)
        {
            return await _context.VesselTypes
                .FirstOrDefaultAsync(v => v.Name == name);
        }

        public async Task<VesselType> GetByDescriptionAsync(string description)
        {
            return await _context.VesselTypes
                .FirstOrDefaultAsync(v => v.Description == description);

        }


    }
}