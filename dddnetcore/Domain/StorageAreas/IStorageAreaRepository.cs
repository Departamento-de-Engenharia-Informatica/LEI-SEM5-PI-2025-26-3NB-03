using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.StorageAreas
{
    public interface IStorageAreaRepository : IRepository<StorageArea, StorageAreaId>
    {
    }
}