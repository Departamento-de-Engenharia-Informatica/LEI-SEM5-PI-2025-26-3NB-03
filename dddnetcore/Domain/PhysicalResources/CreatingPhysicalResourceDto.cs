using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.PhysicalResources
{
    public class CreatingPhysicalResourceDto
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Description { get; set; }

        public TimeSpan? WeekdayStart { get; set; }

        public TimeSpan? WeekdayFinish { get; set; }

        public TimeSpan? WeekendStart { get; set; }

        public TimeSpan? WeekendFinish { get; set; }

        [Required]
        public int ContainerCapacity { get; set; }

        public int? AverageSpeed { get; set; }

        [Range(0, int.MaxValue)]
        public int SetupTime { get; set; }

        [Required, MinLength(1)]
        public List<string> Qualifications { get; set; }

        public Guid? Dock { get; set; }

        public CreatingPhysicalResourceDto(
            string code,
            string type,
            string description,
            TimeSpan? weekdayStart,
            TimeSpan? weekdayFinish,
            TimeSpan? weekendStart,
            TimeSpan? weekendFinish,
            int containerCapacity,
            int? averageSpeed,
            int setupTime, 
            List<string> qualifications,
            Guid? dock)
        {
            this.Code = code;
            this.Type = type;
            this.Description = description;
            this.WeekdayStart = weekdayStart;
            this.WeekdayFinish = weekdayFinish;
            this.WeekendStart = weekendStart;
            this.WeekendFinish = weekendFinish;
            this.ContainerCapacity = containerCapacity;
            this.AverageSpeed = averageSpeed;
            this.SetupTime = setupTime;
            this.Qualifications = qualifications;
            this.Dock = dock;
        }
    }
}
