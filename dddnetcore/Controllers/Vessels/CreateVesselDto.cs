using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Controllers.Vessels
{
    public class CreateVesselDto
    {
        public string ImoNumber { get; set; }
        public string Name { get; set; }
        public string VesselType { get; set; }
        public string Operator { get; set; }
    }
}
