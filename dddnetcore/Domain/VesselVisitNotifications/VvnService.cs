using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DDDSample1.Domain.VesselVisitNotifications
{
    public class VvnService
    {
        private readonly IVvnRepository _repo;
        public VvnService(IVvnRepository repo) { _repo = repo; }

        public async Task<(List<VvnListItemDto> Items, int Total)> SearchAsync(
            string orgId, string vessel, string status, string representative,
            DateTime? from, DateTime? to, int page, int size, string sort)
        {
            var (entities, total) =
                await _repo.SearchAsync(orgId, vessel, status, representative, from, to, page, size, sort);

            var items = entities.Select(v => new VvnListItemDto
            {
                Id = v.Id.AsGuid(),
                VesselIMO = v.VesselIMO,
                VesselName = v.VesselName,
                Status = VvnStatusMapper.ToApiString(v.Status),
                CurrentDock = v.CurrentDock,
                RejectionReason = v.RejectionReason,
                RepresentativeId = v.RepresentativeId,
                RepresentativeName = v.RepresentativeName,
                SubmittedAt = v.SubmittedAt,
                LastUpdatedAt = v.LastUpdatedAt
            }).ToList();

            return (items, total);
        }

        public async Task<VvnListItemDto> CreateAsync(string orgId, CreateVvnDto dto)
        {
            var vvn = VesselVisitNotification.CreateInProgress(
                dto.VesselIMO,
                dto.VesselName,
                orgId,
                dto.RepresentativeId,
                dto.RepresentativeName
            );

            await _repo.AddAsync(vvn);


            return vvn.ToListItemDto();
        }
    }
}
