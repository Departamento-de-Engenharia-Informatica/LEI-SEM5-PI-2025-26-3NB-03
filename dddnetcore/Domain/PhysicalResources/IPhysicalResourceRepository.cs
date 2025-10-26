using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.PhysicalResources
{
    public interface IPhysicalResourceRepository : IRepository<PhysicalResource, PhysicalResourceId>
    {
    }
}