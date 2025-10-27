using DDDNetCore.Domain.Vessels;
using DDDNetCore.Domain.Vessels.ValueObjects;
using System.Collections.Generic;
using System.Linq;

namespace DDDNetCore.Infraestructure.Vessels
{
    // A classe deve declarar que implementa a interface
    public class VesselRepository : IVesselRepository
    {
        // Simula a tabela da base de dados
        private static List<Vessel> _vessels = new List<Vessel>();

        // Método para adicionar um novo navio
        public Vessel Add(Vessel vessel)
        {
            // 1. Verifica se o navio já existe (pelo IMO Number)
            if (_vessels.Any(v => v.ImoNumber.Equals(vessel.ImoNumber)))
            {
                // Em um cenário real, isto lançaria uma exceção
                return null;
            }

            // 2. Adiciona o navio à lista (simulando o INSERT)
            _vessels.Add(vessel);
            return vessel;
        }

        // Método para encontrar um navio pelo IMO Number
        public Vessel GetByImoNumber(ImoNumber imoNumber)
        {
            // 1. Procura o navio na lista (simulando o SELECT)
            return _vessels.FirstOrDefault(v => v.ImoNumber.Equals(imoNumber));
        }

        // Método para encontrar todos os navios
        public IEnumerable<Vessel> GetAll()
        {
            return _vessels.AsEnumerable();
        }

        // Método para atualizar um navio (necessário para a User Story 2.2.2)
        public Vessel Update(Vessel vessel)
        {
            // 1. Encontra o navio existente
            var existingVessel = _vessels.FirstOrDefault(v => v.ImoNumber.Equals(vessel.ImoNumber));

            if (existingVessel == null)
            {
                return null;
            }

            // 2. Remove o antigo e adiciona o novo (simulando o UPDATE)
            _vessels.Remove(existingVessel);
            _vessels.Add(vessel);
            return vessel;
        }
    }



}
