using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.PhysicalResources
{
    public class PhysicalResourceDto
    {
        public Guid Id { get; set; }

        public string Code { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }

        [Newtonsoft.Json.JsonProperty(NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public TimeSpan? WeekdayStart { get; set; }

        [Newtonsoft.Json.JsonProperty(NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public TimeSpan? WeekdayFinish { get; set; }

        [Newtonsoft.Json.JsonProperty(NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public TimeSpan? WeekendStart { get; set; }

        [Newtonsoft.Json.JsonProperty(NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public TimeSpan? WeekendFinish { get; set; }
        public int ContainerCapacity { get; set; }

        [Newtonsoft.Json.JsonProperty(NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public int? AverageSpeed { get; set; }
        public string AvailabilityStatus { get; set; }
        public int SetupTime { get; set; }
        public List<string> Qualifications { get; set; } = new();

        [Newtonsoft.Json.JsonProperty(NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public Guid? Dock { get; set; }
    }
}
