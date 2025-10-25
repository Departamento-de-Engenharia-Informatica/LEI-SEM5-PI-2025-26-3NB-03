namespace DDDSample1.Domain.VesselTypes
{
    public class CreatingVesselTypeDto
    {
        
        public string Name { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public int MaxRows { get; set; }
        public int MaxBays { get; set; }
        public int MaxTiers { get; set; }
        


        public CreatingVesselTypeDto(string name, string description, int capacity, int maxrows, int maxbays, int maxtiers)
        {
            this.Name = name;
            this.Description = description;
            this.Capacity = capacity;
            this.MaxRows = maxrows;
            this.MaxBays = maxbays;
            this.MaxTiers = maxtiers;
        }
    }
}