using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Controllers.Vessels
{
    public class UpdateVesselDto
    {
        public string Name { get; set; }
        public string VesselType { get; set; }
        public string Operator { get; set; }
    }
}
