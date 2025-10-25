using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.VesselVisitNotifications;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.VesselVisitNotifications
{
    public class VvnRepository : BaseRepository<VesselVisitNotification, VvnId>, IVvnRepository
    {
        private readonly DbSet<VesselVisitNotification> _set;

        public VvnRepository(DDDSample1DbContext ctx)
            : base(ctx.Set<VesselVisitNotification>())
        {
            _set = ctx.Set<VesselVisitNotification>();
        }

        public async Task<(List<VesselVisitNotification> Items, int Total)> SearchAsync(
            string organizationId, string vessel, string status, string representative,
            DateTime? from, DateTime? to, int page, int size, string sort)
        {
            var q = _set.AsNoTracking().Where(v => v.OrganizationId == organizationId);

            if (!string.IsNullOrWhiteSpace(vessel))
                q = q.Where(v => v.VesselIMO.Contains(vessel) || v.VesselName.Contains(vessel));

            if (!string.IsNullOrWhiteSpace(status))
            {
                // Map "in_progress"->InProgress, etc.
                var normalized = status.Trim().ToLowerInvariant();
                VvnStatus st = normalized switch
                {
                    "in_progress" => VvnStatus.InProgress,
                    "submitted"   => VvnStatus.Submitted,
                    "approved"    => VvnStatus.Approved,
                    "rejected"    => VvnStatus.Rejected,
                    _ => throw new ArgumentException("Invalid status")
                };
                q = q.Where(v => v.Status == st);
            }

            if (!string.IsNullOrWhiteSpace(representative))
                q = q.Where(v => v.RepresentativeId == representative
                              || v.RepresentativeName.Contains(representative));

            if (from.HasValue) q = q.Where(v => v.SubmittedAt >= from.Value);
            if (to.HasValue)   q = q.Where(v => v.SubmittedAt <  to.Value);

            q = sort switch
            {
                "submittedAt"  => q.OrderBy(v => v.SubmittedAt),
                "-submittedAt" => q.OrderByDescending(v => v.SubmittedAt),
                "vessel"       => q.OrderBy(v => v.VesselName),
                "-vessel"      => q.OrderByDescending(v => v.VesselName),
                _              => q.OrderByDescending(v => v.SubmittedAt)
            };

            var total = await q.CountAsync();
            var items = await q.Skip((page - 1) * size).Take(size).ToListAsync();
            return (items, total);
        }
    }
}
