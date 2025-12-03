using DDDSample1.Domain.StorageAreas;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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
            var storageAreas = await _context.StorageAreas.ToListAsync();

            var storageAreaDocks = await _context.StorageAreaDocks.ToListAsync();

            var docks = await _context.Docks.ToListAsync();

            foreach (var sa in storageAreas)
            {
                var docksRelacionados = storageAreaDocks
                    .Where(sad => sad.StorageAreaId == sa.Id)
                    .ToList();

                foreach (var sad in docksRelacionados)
                {
                    var dockInstance = docks.FirstOrDefault(d => d.Id == sad.DockId);
                    if (dockInstance != null)
                    {
                        var storageAreaDock = new StorageAreaDock(sad.StorageAreaId, dockInstance.Id)
                        {
                            Dock = dockInstance
                        };
                        sa.AddDock(storageAreaDock);
                    }
                }
            }

            return storageAreas;
        }

        public new async Task<StorageArea> GetByIdAsync(StorageAreaId id)
        {
            var sa = await _context.StorageAreas.FirstOrDefaultAsync(x => x.Id == id);
            if (sa == null) return null;

            var docksRelacionados = await _context.StorageAreaDocks
                .Where(sad => sad.StorageAreaId == sa.Id)
                .ToListAsync();

            var allDocks = await _context.Docks.ToListAsync();

            foreach (var sad in docksRelacionados)
            {
                var dockInstance = allDocks.FirstOrDefault(d => d.Id == sad.DockId);
                if (dockInstance != null)
                {
                    var storageAreaDock = new StorageAreaDock(sad.StorageAreaId, dockInstance.Id)
                    {
                        Dock = dockInstance
                    };
                    sa.AddDock(storageAreaDock);
                }
            }

            return sa;
        }
    }
}
