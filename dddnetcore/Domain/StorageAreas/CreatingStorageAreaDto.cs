namespace DDDSample1.Domain.StorageAreas
{
    public class CreatingStorageAreaDto
    {
        public string Type { get; set; }
        public string Location { get; set; }

        public CreatingStorageAreaDto(string type, string location)
        {
            this.Type = type;
            this.Location = location;
        }
    }
}