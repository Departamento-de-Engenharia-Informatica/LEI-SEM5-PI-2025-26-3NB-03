using System;
using System.Linq;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VesselTypes;
using Microsoft.AspNetCore.Routing.Constraints;

namespace DDDSample1.Domain.Docks
{
    public class CreatingDockDto
{
    public string Name { get;  set;} = null!;
    public float LocationX { get; set; }
    public float LocationZ { get; set; } 
    public float LocationOrientation { get; set; }
    public int Length { get; set; }
    public int Depth { get; set; }
    public int MaxDraft { get; set; }
    public int Capacity { get; set; }
    public List<Guid> VesselTypeIds { get; set; } = new();

    public CreatingDockDto() { }

        public CreatingDockDto(string name, float locationx, float locationz, float locationorientation, int length, int depth, int maxdraft, int capacity, List<Guid> vesseltypeids)
        {
            this.Name = name;
            this.LocationX = locationx;
            this.LocationZ = locationz;
            this.LocationOrientation = locationorientation;
            this.Length = length;
            this.Depth = depth;
            this.MaxDraft = maxdraft;
            this.Capacity = capacity;
            this.VesselTypeIds = vesseltypeids;


        }
}
}