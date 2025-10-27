using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.PhysicalResources
{
    public class CreatingPhysicalResourceDto
    {
        [Required]
        public string Description { get; set; }

        [Required]
        public string OperationalCapacity { get; set; }

        [Required]
        public string AvailabilityStatus { get; set; }

        public int SetupTime { get; set; }

        [Required]
        public List<string> Qualifications { get; set; }

        public CreatingPhysicalResourceDto(string description, string capacity, string status, int setupTime, List<string> qualifications)
        {
            this.Description = description;
            this.OperationalCapacity = capacity;
            this.AvailabilityStatus = status;
            this.SetupTime = setupTime;
            this.Qualifications = qualifications;
        }
    }
}