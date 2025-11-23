using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.StorageAreas
{
    public class CreatingStorageAreaDto
    {
        [Required]
        public string Type { get; set; }

        [Required]
        public float LocationX { get; set; }

        [Required]
        public float LocationZ { get; set; }

        [Required]
        public float LocationOrientation { get; set; }

        [Range(1, int.MaxValue)]
        public int MaximumCapacity { get; set; }

        [Range(0, int.MaxValue)]
        public int CurrentOccupancy { get; set; }

        public List<Guid> Docks { get; set; }

        public CreatingStorageAreaDto(string type, float locationX, float locationZ, float locationOrientation, int maximumCapacity, int currentOccupancy, List<Guid> docks)
        {
            this.Type = type;
            this.LocationX = locationX;
            this.LocationZ = locationZ;
            this.LocationOrientation = locationOrientation;
            this.MaximumCapacity = maximumCapacity;
            this.CurrentOccupancy = currentOccupancy;

            this.Docks = docks ?? new List<Guid>();
        }
    }
}
