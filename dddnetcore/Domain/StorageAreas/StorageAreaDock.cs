using DDDSample1.Domain.Docks;

namespace DDDSample1.Domain.StorageAreas
{
    public class StorageAreaDock
    {
        public StorageAreaId StorageAreaId { get; set; }
        public StorageArea StorageArea { get; set; }

        public DockId DockId { get; set; }
        public Dock Dock { get; set; }

        public StorageAreaDock() { }

        public StorageAreaDock(StorageAreaId storageAreaId, DockId dockId)
        {
            StorageAreaId = storageAreaId;
            DockId = dockId;
        }
    }
}
