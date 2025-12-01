using System.Collections.Generic;
using DDDNetCore.Domain.Vessels.ValueObjects;


namespace DDDNetCore.Domain.Vessels
{
    public interface IVesselRepository
    {
        // Método para adicionar um novo navio
        Vessel Add(Vessel vessel);

        // Método para encontrar um navio pelo IMO Number
        Vessel GetByImoNumber(ImoNumber imoNumber);

        // NOVO: Método para obter todos os navios
        IEnumerable<Vessel> GetAll();

        // Método para atualizar um navio
        Vessel Update(Vessel vessel);
    }
}
