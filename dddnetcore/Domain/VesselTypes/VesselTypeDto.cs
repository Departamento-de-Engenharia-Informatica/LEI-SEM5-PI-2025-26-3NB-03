using System;

namespace DDDSample1.Domain.VesselTypes
{
    public class VesselTypeDto
    {
        public Guid VesselTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public int MaxRows { get; set; }
        public int MaxBays { get; set; }
        public int MaxTiers { get; set; }
    }
}