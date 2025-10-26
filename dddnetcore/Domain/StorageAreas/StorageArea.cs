using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.StorageAreas
{
    public class StorageArea : Entity<StorageAreaId>, IAggregateRoot
    {
        public string Type { get;  private set; }
        public string Location { get; private set; }

        private StorageArea()
        {
        }

        public StorageArea(string type, string location)
        {
            this.Id = new StorageAreaId(Guid.NewGuid());
            this.Type = type;
            this.Location = location;
        }

        public void ChangeType(string type)
        {
            this.Type = type;
        }
        public void ChangeLocation(string location)
        {
            this.Location = location;
        }

        public static StorageArea CreateSubmitted(
            string type, string location)
            => new(type, location);
    }
}