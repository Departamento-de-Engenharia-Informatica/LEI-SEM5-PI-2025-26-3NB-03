using DDDSample1.Domain.Representatives;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Representatives
{
    public class RepresentativeRepository : BaseRepository<Representative, RepresentativeId>, IRepresentativeRepository
    {
        public RepresentativeRepository(DDDSample1DbContext context):base(context.Representatives)
        {
           
        }
    }
}