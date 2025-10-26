using DDDSample1.Domain.Qualifications;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.PhysicalResources
{
    public class PhysicalResource : Entity<PhysicalResourceId>, IAggregateRoot
    {
        public string Description { get;  private set; }
        public string OperationalCapacity { get; private set; }
        public string AvailabilityStatus { get; private set; }
        public int SetupTime { get; private set; }

        private readonly List<Qualification> _qualifications = new();
        public IReadOnlyCollection<Qualification> Qualifications => _qualifications.AsReadOnly();

        public bool Active { get; private set; }

        private PhysicalResource()
        {
            this.Active = true;
        }

        public PhysicalResource(string description, string capacity, string status, int setupTime, List<Qualification> qualifications)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new BusinessRuleValidationException("Description is required.");
            if (string.IsNullOrWhiteSpace(capacity))
                throw new BusinessRuleValidationException("Operational Capacity is required.");
            if (string.IsNullOrWhiteSpace(status))
                throw new BusinessRuleValidationException("Availability Status is required.");
            if (setupTime < 0)
                throw new BusinessRuleValidationException("Setup Time cannot be negative.");
            if (qualifications == null || qualifications.Count == 0)
                throw new BusinessRuleValidationException("A Physical Resource needs at least one Qualification.");

            this.Id = new PhysicalResourceId(Guid.NewGuid());
            this.Description = description;
            this.OperationalCapacity = capacity;
            this.AvailabilityStatus = status;
            this.SetupTime = setupTime;
            _qualifications.AddRange(qualifications);
        }

        public void ChangeDescription(string description)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new BusinessRuleValidationException("Description is required.");
            this.Description = description;
        }
        public void ChangeOperationalCapacity(string capacity)
        {
            if (string.IsNullOrWhiteSpace(capacity))
                throw new BusinessRuleValidationException("Operational Capacity is required.");
            this.OperationalCapacity = capacity;
        }
        public void ChangeAvailabilityStatus(string status)
        {
            if (string.IsNullOrWhiteSpace(status))
                throw new BusinessRuleValidationException("Availability Status is required.");
            this.AvailabilityStatus = status;
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

        public void MarkAsInative()
        {
            this.Active = false;
            this.AvailabilityStatus = "Inactive";
        }

        public static PhysicalResource CreateSubmitted(
            string description, string capacity, string status, int setupTime, List<Qualification> qualifications)
            => new(description, capacity, status, setupTime, qualifications);
    }
}