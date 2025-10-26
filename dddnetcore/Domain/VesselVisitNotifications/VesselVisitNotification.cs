using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.VesselVisitNotifications
{
    public enum VvnStatus { InProgress, Submitted, Approved, Rejected }

    public class VesselVisitNotification : Entity<VvnId>, IAggregateRoot
    {
        // Required props (EF private setters)
        public string VesselIMO { get; private set; }
        public string VesselName { get; private set; }
        public VvnStatus Status { get; private set; }
        public string CurrentDock { get; private set; }        // if Approved
        public string RejectionReason { get; private set; }     // if Rejected

        public string RepresentativeId { get; private set; }
        public string RepresentativeName { get; private set; }
        public string OrganizationId { get; private set; }

        public DateTime SubmittedAt { get; private set; }
        public DateTime LastUpdatedAt { get; private set; }

        // EF Core
        private VesselVisitNotification() { }

        private VesselVisitNotification(
            string vesselIMO,
            string vesselName,
            VvnStatus status,
            string organizationId,
            string representativeId,
            string representativeName,
            string currentDock,
            string rejectionReason,
            DateTime submittedAt,
            DateTime lastUpdatedAt)
        {
            Id = new VvnId(Guid.NewGuid());
            VesselIMO = vesselIMO;
            VesselName = vesselName;
            Status = status;
            OrganizationId = organizationId;
            RepresentativeId = representativeId;
            RepresentativeName = representativeName;
            CurrentDock = currentDock;
            RejectionReason = rejectionReason;
            SubmittedAt = submittedAt;
            LastUpdatedAt = lastUpdatedAt;
        }

        // Fábricas (se precisares noutras US)
        public static VesselVisitNotification CreateSubmitted(
            string vesselIMO, string vesselName,
            string organizationId, string representativeId, string representativeName,
            DateTime submittedAtUtc)
            => new VesselVisitNotification(vesselIMO, vesselName, VvnStatus.Submitted,
                                           organizationId, representativeId, representativeName,
                                           null, null, submittedAtUtc, submittedAtUtc);
    }
}
