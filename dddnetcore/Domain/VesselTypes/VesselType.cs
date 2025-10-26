using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Docks;
using System.Collections.Generic;


namespace DDDSample1.Domain.VesselTypes
{
    public class VesselType : Entity<VesselTypeId>, IAggregateRoot
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public int Capacity { get; private set; }
        public int MaxRows { get; private set; }
        public int MaxBays { get; private set; }
        public int MaxTiers { get; private set; }

        private readonly List<Dock> _docks = new();
        public IReadOnlyCollection<Dock> Docks => _docks.AsReadOnly();

        // EF Core
        private VesselType() { }

        public VesselType(string name, string description, int capacity, int maxrows, int maxbays, int maxtiers)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name is required.");

            if (string.IsNullOrWhiteSpace(description))
                throw new BusinessRuleValidationException("Description is required.");

            if (capacity <= 0)
                throw new BusinessRuleValidationException("Capacity must be a positive integer.");

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
