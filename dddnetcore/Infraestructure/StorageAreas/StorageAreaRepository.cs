using DDDSample1.Domain.StorageAreas;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Infrastructure.StorageAreas
{
    public class StorageAreaRepository : BaseRepository<StorageArea, StorageAreaId>, IStorageAreaRepository
    {
        private readonly DDDSample1DbContext _context;

        public StorageAreaRepository(DDDSample1DbContext context):base(context.StorageAreas)
        {
            _context = context;
        }

        public new async Task<List<StorageArea>> GetAllAsync()
        {
            return await _context.StorageAreas
                .Include(o => o.Docks)
                .ToListAsync();
        }

        public new async Task<StorageArea> GetByIdAsync(StorageAreaId id)
        {
            return await _context.StorageAreas
                .Include(o => o.Docks)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}