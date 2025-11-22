using DDDSample1.Domain.Shared;
using System;

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

        private StorageArea()
        {
        }

        public StorageArea(string type, float locationX, float locationZ, float locationOrientation, int maximumCapacity, int currentOccupancy)
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
            if (maximumCapacity < this.CurrentOccupancy)
                throw new BusinessRuleValidationException("Maximum capacity cannot be less than current occupancy.");

            this.MaximumCapacity = maximumCapacity;
        }
        public void ChangeCurrentOccupancy(int currentOccupancy)
        {
            if (currentOccupancy > this.MaximumCapacity)
                throw new BusinessRuleValidationException("Current occupancy cannot exceed maximum capacity.");

            this.CurrentOccupancy = currentOccupancy;
        }

        public static StorageArea CreateSubmitted(
            string type, float locationX, float locationZ, float locationOrientation, int maximumCapacity, int currentOccupancy)
            => new(type, locationX, locationZ, locationOrientation, maximumCapacity, currentOccupancy);
    }
}