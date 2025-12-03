using DDDSample1.Domain.Docks;
using DDDSample1.Domain.Qualifications;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.PhysicalResources
{
    public class PhysicalResource : Entity<PhysicalResourceId>, IAggregateRoot
    {
        public string Code { get; private set; }
        public string Type { get; private set; }
        public string Description { get;  private set; }
        public TimeSpan? WeekdayStart { get; private set; } // Operational Window
        public TimeSpan? WeekdayFinish { get; private set; } // Operational Window
        public TimeSpan? WeekendStart { get; private set; } // Operational Window
        public TimeSpan? WeekendFinish { get; private set; } // Operational Window
        public int ContainerCapacity { get; private set; } // Operational Capacity
        public int? AverageSpeed { get; private set; } // Operational Capacity
        public string AvailabilityStatus { get; private set; }
        public int SetupTime { get; private set; }

        private readonly List<Qualification> _qualifications = new();
        public IReadOnlyCollection<Qualification> Qualifications => _qualifications.AsReadOnly();

        public Dock AssignedDock { get; private set; }
        public DockId AssignedDockId { get; private set; }

        public bool Active { get; private set; }

        private PhysicalResource()
        {
            this.Active = true;
        }

        public PhysicalResource(
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
            List<Qualification> qualifications, 
            Dock dock)
        {
            if (string.IsNullOrWhiteSpace(code))
                throw new BusinessRuleValidationException("Code is required.");
            if (string.IsNullOrWhiteSpace(type))
                throw new BusinessRuleValidationException("Type is required.");
            if (string.IsNullOrWhiteSpace(description))
                throw new BusinessRuleValidationException("Description is required.");
            if (!((weekdayStart.HasValue && weekdayFinish.HasValue) ||
                (weekendStart.HasValue && weekendFinish.HasValue)))
            {
                throw new BusinessRuleValidationException(
                    "At least one operational window must be defined.");
            }
            if (weekdayStart.HasValue && weekdayFinish.HasValue)
            {
                if (weekdayStart > weekdayFinish)
                    throw new BusinessRuleValidationException("Weekday Start Time has to be before the Weekday Finish Time.");
            }
            if (weekendStart.HasValue && weekendFinish.HasValue)
            {
                if (weekendStart > weekendFinish)
                    throw new BusinessRuleValidationException("Weekend Start Time has to be before the Weekend Finish Time.");
            }
            if (containerCapacity < 1)
                throw new BusinessRuleValidationException("Container Capacity has to be higher than 1.");
            if (type.Equals("Truck", StringComparison.OrdinalIgnoreCase))
            {
                if (averageSpeed == null || averageSpeed < 1)
                    throw new BusinessRuleValidationException("A Truck must have an Average Speed of at least 1.");
            }
            else
            {
                if (averageSpeed != null)
                    throw new BusinessRuleValidationException("Only Trucks can have an Average Speed.");
            }
            if (setupTime < 0)
                throw new BusinessRuleValidationException("Setup Time cannot be negative.");
            if (qualifications == null || qualifications.Count == 0)
                throw new BusinessRuleValidationException("A Physical Resource needs at least one Qualification.");
            if (dock == null && type.Equals("Fixed Crane", StringComparison.OrdinalIgnoreCase))
                throw new BusinessRuleValidationException("A Fixed Crane needs to be assigned to a dock.");
            if (dock != null && !(type.Equals("Fixed Crane", StringComparison.OrdinalIgnoreCase)))
                throw new BusinessRuleValidationException("Only Fixed Cranes can be assigned to docks.");

            this.Id = new PhysicalResourceId(Guid.NewGuid());
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
            _qualifications.AddRange(qualifications);
            this.AssignedDock = dock;
            this.AssignedDockId = dock?.Id;
            this.AvailabilityStatus = "Active";
            this.Active = true;
        }

        public void ChangeCode(string code)
        {
            if (string.IsNullOrWhiteSpace(code))
                throw new BusinessRuleValidationException("Code is required.");
            this.Code = code;
        }
        public void ChangeType(string type)
        {
            if (string.IsNullOrWhiteSpace(type))
                throw new BusinessRuleValidationException("Type is required.");
            this.Type = type;
        }
        public void ChangeDescription(string description)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new BusinessRuleValidationException("Description is required.");
            this.Description = description;
        }
        public void ChangeWeekdayStart(TimeSpan? weekdayStart)
        {
            this.WeekdayStart = weekdayStart;
        }
        public void ChangeWeekdayFinish(TimeSpan? weekdayFinish)
        {
            if (this.WeekdayStart.HasValue && weekdayFinish.HasValue)
            {
                if (this.WeekdayStart > weekdayFinish)
                    throw new BusinessRuleValidationException("Weekday Start Time has to be before the Weekday Finish Time.");
            }
            this.WeekdayFinish = weekdayFinish;
        }
        public void ChangeWeekendStart(TimeSpan? weekendStart)
        {
            this.WeekendStart = weekendStart;
        }
        public void ChangeWeekendFinish(TimeSpan? weekendFinish)
        {
            if (this.WeekendStart.HasValue && weekendFinish.HasValue)
            {
                if (this.WeekendStart > weekendFinish)
                    throw new BusinessRuleValidationException("Weekend Start Time has to be before the Weekend Finish Time.");
            }
            if (!((this.WeekdayStart.HasValue && this.WeekdayFinish.HasValue) ||
                (this.WeekendStart.HasValue && weekendFinish.HasValue)))
            {
                throw new BusinessRuleValidationException(
                    "At least one operational window must be defined.");
            }
            this.WeekendFinish = weekendFinish;
        }
        public void ChangeContainerCapacity(int containerCapacity)
        {
            if (containerCapacity < 1)
                throw new BusinessRuleValidationException("Container Capacity has to be higher than 1.");
            this.ContainerCapacity = containerCapacity;
        }
        public void ChangeAverageSpeed(int? averageSpeed)
        {
            if (this.Type.Equals("Truck", StringComparison.OrdinalIgnoreCase))
            {
                if (averageSpeed == null || averageSpeed < 1)
                    throw new BusinessRuleValidationException("A Truck must have an Average Speed of at least 1.");
            }
            else
            {
                if (averageSpeed != null)
                    throw new BusinessRuleValidationException("Only Trucks can have an Average Speed.");
            }
            this.AverageSpeed = averageSpeed;
        }
        public void ChangeSetupTime(int setupTime)
        {
            if (setupTime < 0)
                throw new BusinessRuleValidationException("Setup Time cannot be negative.");
            this.SetupTime = setupTime;
        }
        public void ChangeQualifications(List<Qualification> qualifications)
        {
            if (qualifications == null || qualifications.Count == 0)
                throw new BusinessRuleValidationException("A Physical Resource needs at least one Qualification.");

            _qualifications.Clear();
            _qualifications.AddRange(qualifications);
        }
        public void ChangeAvailabilityStatus(string status)
        {
            this.AvailabilityStatus = status;
        }
        public void ChangeAssignedDock(Dock dock)
        {
            if (dock == null && this.Type.Equals("Fixed Crane", StringComparison.OrdinalIgnoreCase))
                throw new BusinessRuleValidationException("A Fixed Crane needs to be assigned to a dock.");
            if (dock != null && !(this.Type.Equals("Fixed Crane", StringComparison.OrdinalIgnoreCase)))
                throw new BusinessRuleValidationException("Only Fixed Cranes can be assigned to docks.");
            this.AssignedDock = dock;
            this.AssignedDockId = dock?.Id;
        }

        public void MarkAsInative()
        {
            this.Active = false;
            this.AvailabilityStatus = "Inactive";
        }

        public void CheckAvailability()
        {
            if (!this.Active)
            {
                this.AvailabilityStatus = "Inactive";
                return;
            }

            this.AvailabilityStatus = "Active";

            var currentTime = DateTime.Now.TimeOfDay;
            var dayOfWeek = DateTime.Now.DayOfWeek;

            if (dayOfWeek >= DayOfWeek.Monday && dayOfWeek <= DayOfWeek.Friday)
            {
                if (this.WeekdayStart.HasValue && this.WeekdayFinish.HasValue)
                {
                    if (currentTime < this.WeekdayStart.Value || currentTime > this.WeekdayFinish.Value)
                    {
                        this.AvailabilityStatus = "Maintenance";
                    }
                }
            } else {
                if (this.WeekendStart.HasValue && this.WeekendFinish.HasValue)
                {
                    if (currentTime < this.WeekendStart.Value || currentTime > this.WeekendFinish.Value)
                    {
                        this.AvailabilityStatus = "Maintenance";
                    }
                }
            }
        }

        public static PhysicalResource CreateSubmitted(
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
            List<Qualification> qualifications,
            Dock dock)
            => new (
                code,
                type,
                description,
                weekdayStart,
                weekdayFinish,
                weekendStart,
                weekendFinish,
                containerCapacity,
                averageSpeed,
                setupTime,
                qualifications,
                dock);
    }
}
