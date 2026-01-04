using System;

namespace DDDSample1.Controllers.Vessels
{
    public class VesselDto
    {
        public Guid Id { get; set; }         // ou string, se preferires
        public string ImoNumber { get; set; }
        public string Name { get; set; }
        public string VesselType { get; set; }
        public string Operator { get; set; }
    }
}
