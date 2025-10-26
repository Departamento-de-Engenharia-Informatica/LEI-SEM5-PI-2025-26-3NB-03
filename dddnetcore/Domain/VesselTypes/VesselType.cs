using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.VesselTypes
{
   

    public class VesselType : Entity<VesselTypeId>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public int MaxRows { get; set; }
        public int MaxBays { get; set; }
        public int MaxTiers { get; set; }

        private VesselType() { }

       public VesselType(string name, string description, int capacity, int maxrows, int maxbays, int maxtiers)
        {
              if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name is required.");

            if (string.IsNullOrWhiteSpace(description))
                throw new BusinessRuleValidationException("Description is required.");

            if (capacity <= 0)
                throw new BusinessRuleValidationException("Capacity must be a positive integer."); //navios de manutencao tem capacidade??? se nao as regras abaixo mudam para <0

            if (maxrows <= 0)
                throw new BusinessRuleValidationException("MaxRows must be a positive integer."); 

            if (maxbays <= 0)
                throw new BusinessRuleValidationException("MaxBays must be a positive integer.");

            if (maxtiers <= 0)
                throw new BusinessRuleValidationException("MaxTiers must be a positive integer.");

            this.Id = new VesselTypeId(Guid.NewGuid());
            this.Name = name;
            this.Description = description;
            this.Capacity = capacity;
            this.MaxRows = maxrows;
            this.MaxBays = maxbays;
            this.MaxTiers = maxtiers;
        }
    }


}