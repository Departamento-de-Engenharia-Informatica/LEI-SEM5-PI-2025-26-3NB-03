using DDDSample1.Domain.StorageAreas;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.StorageAreas
{
    public class StorageAreaRepository : BaseRepository<StorageArea, StorageAreaId>, IStorageAreaRepository
    {
        public StorageAreaRepository(DDDSample1DbContext context):base(context.StorageAreas)
        {
           
        }
    }
}