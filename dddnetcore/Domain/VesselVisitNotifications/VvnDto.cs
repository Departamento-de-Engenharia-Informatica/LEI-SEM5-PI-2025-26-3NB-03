using System;

namespace DDDSample1.Domain.VesselVisitNotifications
{
    public class VvnListItemDto
    {
        public Guid Id { get; set; }
        public string VesselIMO { get; set; }
        public string VesselName { get; set; }
        public string Status { get; set; }
        public string CurrentDock { get; set; }
        public string RejectionReason { get; set; }
        public string RepresentativeId { get; set; }
        public string RepresentativeName { get; set; }
        public DateTime SubmittedAt { get; set; }
        public DateTime LastUpdatedAt { get; set; }
    }

    public static class VvnStatusMapper
    {
        public static string ToApiString(VvnStatus s) => s switch
        {
            VvnStatus.InProgress => "in_progress",
            VvnStatus.Submitted  => "submitted",
            VvnStatus.Approved   => "approved",
            VvnStatus.Rejected   => "rejected",
            _ => "unknown"
        };
    }
}
