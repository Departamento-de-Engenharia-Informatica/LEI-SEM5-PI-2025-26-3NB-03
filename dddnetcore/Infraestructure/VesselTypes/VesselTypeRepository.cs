using DDDSample1.Domain.VesselTypes;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DDDSample1.Infrastructure.VesselTypes
{
    public class VesselTypeRepository : BaseRepository<VesselType, VesselTypeId>, IVesselTypeRepository
    {
        private readonly DDDSample1DbContext _context;

        public VesselTypeRepository(DDDSample1DbContext context) : base(context.VesselTypes)
        {
            _context = context;
        }

        // Buscar por Name (retorna o primeiro que casar)
        public async Task<VesselType> GetByNameAsync(string name)
        {
            return await _context.VesselTypes
                                 .FirstOrDefaultAsync(v => v.Name == name);
        }

        // Buscar por Description (retorna o primeiro que casar)
        public async Task<VesselType> GetByDescriptionAsync(string description)
        {
            return await _context.VesselTypes
                                 .FirstOrDefaultAsync(v => v.Description == description);
        }
    }
}
