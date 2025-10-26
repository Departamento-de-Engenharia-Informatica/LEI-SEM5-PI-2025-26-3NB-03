using DDDSample1.Domain.Docks;
using DDDSample1.Domain.VesselTypes;
using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DDDSample1.Domain.Docks
{
    public interface IDockRepository : IRepository<Dock, DockId>
        {
            Task<List<Dock>> GetByNameAsync(string name);
            Task<List<Dock>> GetByLocationAsync(string location);
            Task<List<Dock>> GetByVesselTypeAsync(VesselTypeId vesselTypeId);
       
    }

}