using System;
using System.Linq;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VesselTypes;

namespace DDDSample1.Domain.Docks
{
    public class Dock : Entity<DockId>
    {
        public string Name { get; private set; }
        public string Location { get; private set; }
        public int Length { get; private set; }
        public int Depth { get; private set; }
        public int MaxDraft { get; private set; }
        public int Capacity { get; private set; }

        private readonly List<VesselType> _vesselTypes = new();
        public IReadOnlyCollection<VesselType> VesselTypes => _vesselTypes.AsReadOnly();

        // EF Core
        private Dock() { }

        public Dock(string name, string location, int length, int depth, int maxDraft, int capacity, List<VesselType> vesselTypes)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name is required.");

            if (string.IsNullOrWhiteSpace(location))
                throw new BusinessRuleValidationException("Location is required.");

            if (length <= 0)
                throw new BusinessRuleValidationException("Length must be a positive integer.");

            if (depth <= 0)
                throw new BusinessRuleValidationException("Depth must be a positive integer.");

            if (maxDraft <= 0)
                throw new BusinessRuleValidationException("Max draft must be a positive integer.");

            if (capacity <= 0)
                throw new BusinessRuleValidationException("Capacity must be a positive integer.");

            Id = new DockId(Guid.NewGuid());
            Name = name;
            Location = location;
            Length = length;
            Depth = depth;
            MaxDraft = maxDraft;
            Capacity = capacity;

            _vesselTypes.AddRange(vesselTypes);
        }

        public Dock(string name, string location, int length, int depth, int maxDraft, int capacity, List<Guid> vesselTypeIds)
        {
            Validate(name, location, length, depth, maxDraft, capacity);

            Id = new DockId(Guid.NewGuid());
            Name = name;
            Location = location;
            Length = length;
            Depth = depth;
            MaxDraft = maxDraft;
            Capacity = capacity;

            // Converter os GUIDs para entidades VesselType “placeholder” (se necessário)
            foreach (var id in vesselTypeIds)
            {
                _vesselTypes.Add(new VesselType(new VesselTypeId(id), "placeholder", "auto", 0, 0, 0, 0));
            }
        }
        public void AddVesselType(VesselType vesselType)
        {
            if (!_vesselTypes.Contains(vesselType))
                _vesselTypes.Add(vesselType);
        }

        public void RemoveVesselType(VesselType vesselType)
        {   
            _vesselTypes.Remove(vesselType);
        }
        
    }
}
