using System.Collections.Generic;
using DDDSample1.Domain.Vessels.ValueObjects;

namespace DDDSample1.Domain.Vessels
{
    public interface IVesselRepository
    {
        Vessel Add(Vessel vessel);

        Vessel GetByImoNumber(ImoNumber imoNumber);

        IEnumerable<Vessel> GetAll();

        Vessel Update(Vessel vessel);
    }
}
