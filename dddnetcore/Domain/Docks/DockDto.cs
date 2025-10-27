using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Docks
{
    public class DockDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Location { get; set; } = null!;
        public int Length { get; set; }
        public int Depth { get; set; }
        public int MaxDraft { get; set; }
        public int Capacity { get; set; }
        public List<Guid> VesselTypeIds { get; set; } = new();
    }
}
