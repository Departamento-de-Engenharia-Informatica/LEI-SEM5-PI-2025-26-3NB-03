using System;

namespace DDDSample1.Domain.StorageAreas
{
    public class StorageAreaDto
    {
        public Guid Id { get; set; }

        public string Type { get; set; }
        public string Location { get; set; }
        public int MaximumCapacity { get; set; }
        public int CurrentOccupancy { get; set; }
    }
}