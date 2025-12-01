using System.ComponentModel.DataAnnotations;

namespace DDDNetCore.Controllers.Vessels
{
    public class UpdateVesselDto
    {
        // ImoNumber não está aqui, pois é passado no URL

        [Required]
        public string Name { get; set; }

        [Required]
        public string VesselType { get; set; }

        [Required]
        public string Operator { get; set; }
    }
}
