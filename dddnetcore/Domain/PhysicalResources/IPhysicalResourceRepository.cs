using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Domain.PhysicalResources
{
    public interface IPhysicalResourceRepository : IRepository<PhysicalResource, PhysicalResourceId>
    {
        Task<PhysicalResource> GetByCodeAsync(string code);

        Task<List<PhysicalResource>> SearchAsync(
            string code = null,
            string description = null,
            string type = null,
            string availabilityStatus = null
        );
    }
}