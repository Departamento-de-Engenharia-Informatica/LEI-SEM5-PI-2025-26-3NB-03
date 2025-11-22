using System;

namespace DDDSample1.Domain.StorageAreas
{
    public class StorageAreaDto
    {
        public Guid Id { get; set; }

        public string Type { get; set; }
        public float LocationX { get; set; }
        public float LocationZ { get; set; }
        public float LocationOrientation { get; set; }
        public int MaximumCapacity { get; set; }
        public int CurrentOccupancy { get; set; }
    }
}