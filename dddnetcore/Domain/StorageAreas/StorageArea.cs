using DDDSample1.Domain.Docks;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.StorageAreas
{
    public class StorageArea : Entity<StorageAreaId>, IAggregateRoot
    {
        public string Type { get;  private set; }
        public float LocationX { get; private set; }
        public float LocationZ { get; private set; }
        public float LocationOrientation { get; private set; }
        public int MaximumCapacity { get; private set; }
        public int CurrentOccupancy { get; private set; }

        private readonly List<Dock> _docks = new();
        public IReadOnlyCollection<Dock> Docks => _docks.AsReadOnly();

        private StorageArea() { }

        public StorageArea(string type, float locationX, float locationZ, float locationOrientation, int maximumCapacity, int currentOccupancy, List<Dock> docks)
        {
            if (string.IsNullOrWhiteSpace(type))
                throw new BusinessRuleValidationException("Type is required.");
            if (float.IsNaN(locationX) || float.IsNaN(locationZ) || float.IsNaN(locationOrientation))
                throw new BusinessRuleValidationException("Location is required.");
            if (maximumCapacity <= 0)
                throw new BusinessRuleValidationException("Maximum capacity must be greater than zero.");
            if (currentOccupancy < 0)
                throw new BusinessRuleValidationException("Current occupancy cannot be negative.");
            if (currentOccupancy > maximumCapacity)
                throw new BusinessRuleValidationException("Current occupancy cannot exceed maximum capacity.");

            this.Id = new StorageAreaId(Guid.NewGuid());
            this.Type = type;
            this.LocationX = locationX;
            this.LocationZ = locationZ;
            this.LocationOrientation = locationOrientation;
            this.MaximumCapacity = maximumCapacity;
            this.CurrentOccupancy = currentOccupancy;

            _docks.AddRange(docks ?? new List<Dock>());
        }

        public void ChangeType(string type)
        {
            this.Type = type;
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
        public void ChangeMaximumCapacity(int maximumCapacity)
        {
            if (maximumCapacity <= 0)
                throw new BusinessRuleValidationException("Maximum capacity must be greater than zero.");

            this.MaximumCapacity = maximumCapacity;
        }
        public void ChangeCurrentOccupancy(int currentOccupancy)
        {
            if (currentOccupancy < 0)
                throw new BusinessRuleValidationException("Current occupancy cannot be negative.");
            if (currentOccupancy > this.MaximumCapacity)
                throw new BusinessRuleValidationException("Current occupancy cannot exceed maximum capacity.");

            this.CurrentOccupancy = currentOccupancy;
        }

        public void ChangeDocks(List<Dock> docks)
        {
            _docks.Clear();
            _docks.AddRange(docks ?? new List<Dock>());
        }

        public static StorageArea CreateSubmitted(
            string type, float locationX, float locationZ, float locationOrientation, int maximumCapacity, int currentOccupancy, List<Dock> docks)
            => new(type, locationX, locationZ, locationOrientation, maximumCapacity, currentOccupancy, docks);
    }
}
