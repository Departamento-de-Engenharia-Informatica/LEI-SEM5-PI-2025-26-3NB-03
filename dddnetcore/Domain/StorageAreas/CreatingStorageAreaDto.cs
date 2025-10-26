using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.StorageAreas
{
    public class CreatingStorageAreaDto
    {
        [Required]
        public string Type { get; set; }

        [Required]
        public string Location { get; set; }

        [Range(1, int.MaxValue)]
        public int MaximumCapacity { get; set; }

        [Range(0, int.MaxValue)]
        public int CurrentOccupancy { get; set; }

        public CreatingStorageAreaDto(string type, string location, int maximumCapacity, int currentOccupancy)
        {
            this.Type = type;
            this.Location = location;
            this.MaximumCapacity = maximumCapacity;
            this.CurrentOccupancy = currentOccupancy;
        }
    }
}