using System;

namespace DDDNetCore.Controllers.Vessels
{
    public class VesselDto
    {
        public Guid Id { get; set; }
        public string ImoNumber { get; set; }
        public string Name { get; set; }
        public string VesselType { get; set; }
        public string Operator { get; set; }
    }
}
