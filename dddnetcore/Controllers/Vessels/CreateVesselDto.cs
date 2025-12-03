using System.ComponentModel.DataAnnotations;

namespace DDDNetCore.Controllers.Vessels
{
    public class CreateVesselDto
    {
        [Required]
        public string ImoNumber { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string VesselType { get; set; }

        [Required]
        public string Operator { get; set; }
    }
}
