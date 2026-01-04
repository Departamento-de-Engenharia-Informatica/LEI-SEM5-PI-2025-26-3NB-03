using System.Collections.Generic;
using System.Linq;
using DDDSample1.Domain.Vessels;
using DDDSample1.Domain.Vessels.ValueObjects;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Vessels
{
    public class VesselRepository : IVesselRepository
    {
        private readonly DDDSample1DbContext _ctx;

        public VesselRepository(DDDSample1DbContext ctx)
        {
            _ctx = ctx;
        }

        public Vessel Add(Vessel vessel)
        {
            if (_ctx.Vessels.Any(v => v.ImoNumber.Equals(vessel.ImoNumber)))
                return null;

            _ctx.Vessels.Add(vessel);
            _ctx.SaveChanges();
            return vessel;
        }

        public IEnumerable<Vessel> GetAll()
        {
            return _ctx.Vessels.AsNoTracking().ToList();
        }

        public Vessel GetByImoNumber(ImoNumber imoNumber)
        {
            return _ctx.Vessels.FirstOrDefault(v => v.ImoNumber.Equals(imoNumber));
        }

        public Vessel Update(Vessel vessel)
        {
            _ctx.Vessels.Update(vessel);
            _ctx.SaveChanges();
            return vessel;
        }
    }
}
