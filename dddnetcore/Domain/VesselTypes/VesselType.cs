using System;
using DDDSample1.Domain.Shared;

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

        // EF Core
        private VesselType() { }

        public VesselType(string name, string description, int capacity, int maxRows, int maxBays, int maxTiers)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name is required.");

            if (string.IsNullOrWhiteSpace(description))
                throw new BusinessRuleValidationException("Description is required.");

            if (capacity <= 0)
                throw new BusinessRuleValidationException("Capacity must be a positive integer.");

<<<<<<< HEAD
            if (maxrows <= 0)
                throw new BusinessRuleValidationException("MaxRows must be a positive integer."); 
=======
            if (maxRows <= 0)
                throw new BusinessRuleValidationException("MaxRows must be a positive integer.");
>>>>>>> c86068a5f4621245df15c19cdf6cf8d2f12c7fab

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
