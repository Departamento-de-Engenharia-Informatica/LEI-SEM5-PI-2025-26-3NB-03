using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.VesselVisitNotifications
{
    public enum VvnStatus { InProgress, Submitted, Approved, Rejected }

    public class VesselVisitNotification : Entity<VvnId>, IAggregateRoot
    {

        public string VesselIMO { get; private set; }
        public string VesselName { get; private set; }
        public VvnStatus Status { get; private set; }
        public string CurrentDock { get; private set; }
        public string RejectionReason { get; private set; }

        public string RepresentativeId { get; private set; }
        public string RepresentativeName { get; private set; }
        public string OrganizationId { get; private set; }

        public DateTime SubmittedAt { get; private set; }
        public DateTime LastUpdatedAt { get; private set; }


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

        public VvnListItemDto ToListItemDto()
        {
            return new VvnListItemDto
            {
                Id = this.Id.AsGuid(),
                VesselIMO = this.VesselIMO,
                VesselName = this.VesselName,
                Status = VvnStatusMapper.ToApiString(this.Status),
                CurrentDock = this.CurrentDock,
                RejectionReason = this.RejectionReason,
                RepresentativeId = this.RepresentativeId,
                RepresentativeName = this.RepresentativeName,
                SubmittedAt = this.SubmittedAt,
                LastUpdatedAt = this.LastUpdatedAt
            };
        }
        public static VesselVisitNotification CreateInProgress(
            string vesselIMO,
            string vesselName,
            string organizationId,
            string representativeId,
            string representativeName
        )
        {
            var now = DateTime.UtcNow;

            return new VesselVisitNotification(
                vesselIMO,
                vesselName,
                VvnStatus.InProgress,
                organizationId,
                representativeId,
                representativeName,
                currentDock: null,
                rejectionReason: null,
                submittedAt: now,
                lastUpdatedAt: now
            );
        }
        public static VesselVisitNotification CreateSubmitted(
            string vesselIMO, string vesselName,
            string organizationId, string representativeId, string representativeName,
            DateTime submittedAtUtc)
            => new VesselVisitNotification(vesselIMO, vesselName, VvnStatus.Submitted,
                                           organizationId, representativeId, representativeName,
                                           null, null, submittedAtUtc, submittedAtUtc);
    }
}
