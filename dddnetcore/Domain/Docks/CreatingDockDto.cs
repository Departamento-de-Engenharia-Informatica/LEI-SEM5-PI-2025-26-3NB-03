using System;
using System.Linq;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VesselTypes;

namespace DDDSample1.Domain.Docks
{
    public class CreatingDockDto
{
    public string Name { get;  set;} = null!;
    public string Location { get; set; } = null!;
    public int Length { get; set; }
    public int Depth { get; set; }
    public int MaxDraft { get; set; }
    public int Capacity { get; set; }
    public List<Guid> VesselTypeIds { get; set; } = new();

    public CreatingDockDto() { }

        public CreatingDockDto(string name, string location, int length, int depth, int maxdraft, int capacity, List<Guid> vesseltypeids)
        {
            this.Name = name;
            this.Location = location;
            this.Length = length;
            this.Depth = depth;
            this.MaxDraft = maxdraft;
            this.Capacity = capacity;
            this.VesselTypeIds = vesseltypeids;

        }
}
}