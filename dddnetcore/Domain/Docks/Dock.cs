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
        
         public void ChangeName(string name)
        {
            this.Name = name;
        }
        public void ChangeLocationX(float locationX)
        {
            this.LocationX = locationX;
        }
        public void ChangeLocationZ(float locationZ)
        {
            this.LocationZ = locationZ;
        }
        public void ChangeLocationOrientation(float locationOrientation)
        {
            this.LocationOrientation = locationOrientation;
        }


        public void ChangeLength(int length)
        {
            if (length <= 0)
                throw new BusinessRuleValidationException("Length must be greater than zero.");

            this.Length = length;
        }

        public void ChangeDepth(int depth)
        {
            if (depth <= 0)
                throw new BusinessRuleValidationException("Depth must be greater than zero.");

            this.Depth = depth;
        }

        public void ChangeMaxDraft(int maxdraft)
        {
            if (maxdraft <= 0)
                throw new BusinessRuleValidationException("Max Draft must be greater than zero.");

            this.MaxDraft = maxdraft;
        }

        public void ChangeCapacity(int capacity)
        {
            if (capacity <= 0)
                throw new BusinessRuleValidationException("Capacity must be greater than zero.");

            this.Capacity = capacity;
        }

        public void ChangeVesselTypes(List<VesselType> vesseltypes)
        {
            _vesselTypes.Clear();
            _vesselTypes.AddRange(vesseltypes ?? new List<VesselType>());
        }

        public static Dock CreateSubmitted(
            string name, float locationX, float locationZ, float locationOrientation, int length, int depth, int maxdraft, int capacity,  List<VesselType> vesseltypes)
            => new(name, locationX, locationZ, locationOrientation, length, depth, maxdraft, capacity, vesseltypes);
        

    }
}
