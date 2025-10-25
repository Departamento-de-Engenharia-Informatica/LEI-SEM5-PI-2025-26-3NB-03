using DDDSample1.Domain.VesselTypes;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.VesselTypes
{
    public class VesselTypeRepository : BaseRepository<VesselType, VesselTypeId>, IVesselTypeRepository
    {
    
        public CategoryRepository(DDDSample1DbContext context):base(context.Categories)
        {
           
        }


    }
}