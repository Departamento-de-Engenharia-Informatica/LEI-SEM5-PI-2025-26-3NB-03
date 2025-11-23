using System;
using System.Linq;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VesselTypes;

namespace DDDSample1.Domain.Docks
{
    public class Dock : Entity<DockId>
    {
        public string Name { get;  set; }
        public float LocationX { get; private set; }
        public float LocationZ { get; private set; }
        public float LocationOrientation { get; private set; }
        public int Length { get; set; }
        public int Depth { get; set; }
        public int MaxDraft { get; set; }
        public int Capacity { get; set; }

        private readonly List<VesselType> _vesselTypes = new();
        public IReadOnlyCollection<VesselType> VesselTypes => _vesselTypes.AsReadOnly();

        // EF Core
        private Dock() { }

        public Dock(string name, float locationx, float locationz, float locationorientation, int length, int depth, int maxDraft, int capacity, List<VesselType> vesselTypes)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name is required.");

            if (float.IsNaN(locationx) || float.IsNaN(locationz) || float.IsNaN(locationorientation))
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
            LocationX = locationx;
            LocationZ = locationz;
            LocationOrientation = locationorientation;
            Length = length;
            Depth = depth;
            MaxDraft = maxDraft;
            Capacity = capacity;

            _vesselTypes.AddRange(vesselTypes ?? new List<VesselType>());
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
