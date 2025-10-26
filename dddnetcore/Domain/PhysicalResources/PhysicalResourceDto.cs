using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.PhysicalResources
{
    public class PhysicalResourceDto
    {
        public Guid Id { get; set; }

        public string Description { get; set; }
        public string OperationalCapacity { get; set; }
        public string AvailabilityStatus { get; set; }
        public int SetupTime { get; set; }
        public List<string> Qualifications { get; set; }
    }
}