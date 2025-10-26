
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VesselTypes;

namespace DDDSample1.Domain.VesselTypes
{
    public interface IVesselTypeRepository: IRepository<VesselType, VesselTypeId>
    {
        Task<VesselType> GetByNameAsync(string name);
        Task<VesselType> GetByDescriptionAsync(string description);
    }
}