using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.VesselVisitNotifications
{
    public interface IVvnRepository : IRepository<VesselVisitNotification, VvnId>
    {
        Task<(List<VesselVisitNotification> Items, int Total)> SearchAsync(
            string organizationId,
            string vessel, string status, string representative,
            DateTime? from, DateTime? to,
            int page, int size, string sort);
    }
}
