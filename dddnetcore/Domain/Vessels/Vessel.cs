using DDDSample1.Domain.Vessels.ValueObjects;
using System;
using System.Linq;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.Vessels
{
    public class Vessel
    {
        // 1. Identificador da Entidade (ID) - Usamos Guid como chave primária
        public Guid Id { get; private set; }

        // 2. Value Object - O ImoNumber é o identificador único e já contém a lógica de validação
        // NOTA: Você precisa ter a classe ImoNumber.cs criada e referenciada
        public ImoNumber ImoNumber { get; private set; }

        // 3. Atributos Simples (User Story 2.2.2)
        public string Name { get; private set; }
        public string VesselType { get; private set; }
        public string Operator { get; private set; }

        // Construtor Vazio (necessário para o Entity Framework Core)
        protected Vessel() { }

        // Construtor Principal (para criar um novo navio)
        public Vessel(ImoNumber imoNumber, string name, string vesselType, string @operator)
        {
            // Validações básicas (não nulo/vazio)
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(vesselType) || string.IsNullOrWhiteSpace(@operator))
            {
                throw new ArgumentException("Vessel Name, Type, and Operator must be provided.");
            }

            // O Id é gerado na criação
            this.Id = Guid.NewGuid();

            // O Value Object ImoNumber já garante que o número é válido
            this.ImoNumber = imoNumber;
            this.Name = name;
            this.VesselType = vesselType;
            this.Operator = @operator;
        }

        // Método para Atualizar (User Story 2.2.2 - Update)
        public void Update(string name, string vesselType, string @operator)
        {
            // O IMO Number é imutável, por isso não está nos parâmetros de Update.
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(vesselType) || string.IsNullOrWhiteSpace(@operator))
            {
                throw new ArgumentException("Vessel Name, Type, and Operator must be provided for update.");
            }

            this.Name = name;
            this.VesselType = vesselType;
            this.Operator = @operator;
        }
    }
}
