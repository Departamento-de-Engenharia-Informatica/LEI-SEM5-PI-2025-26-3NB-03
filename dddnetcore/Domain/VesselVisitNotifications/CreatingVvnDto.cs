using System;

namespace DDDSample1.Domain.VesselVisitNotifications
{
    public class CreateVvnDto
    {
        public string VesselIMO { get; set; }
        public string VesselName { get; set; }
        public string RepresentativeId { get; set; }
        public string RepresentativeName { get; set; }
    }
}