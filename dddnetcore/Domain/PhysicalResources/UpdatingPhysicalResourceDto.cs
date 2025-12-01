using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.PhysicalResources
{
    public class UpdatingPhysicalResourceDto
    {
        public string Code { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public TimeSpan? WeekdayStart { get; set; }
        public TimeSpan? WeekdayFinish { get; set; }
        public TimeSpan? WeekendStart { get; set; }
        public TimeSpan? WeekendFinish { get; set; }
        public int ContainerCapacity { get; set; }
        public int? AverageSpeed { get; set; }
        public int SetupTime { get; set; }
        public List<string> Qualifications { get; set; }
        public Guid? Dock { get; set; }
    }
}
