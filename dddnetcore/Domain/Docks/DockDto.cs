using System;
using System.Linq;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VesselTypes;

namespace DDDSample1.Domain.Docks
{
    public class DockDto
    {
        public Guid Id { get; set; }
        public string Name { get; private set; }
        public string Location { get; private set; }
        public int Length { get; private set; }
        public int Depth { get; private set; }
        public int MaxDraft { get; private set; }
        public int Capacity { get; private set; }
        List<VesselTypeId> VesselTypeIds { get; set; }
    }
}