using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Staff;

namespace DDDSample1.Infrastructure.Staff
{
    public class StaffMemberRepository
        : BaseRepository<StaffMember, StaffMemberId>, IStaffMemberRepository
    {
        private readonly DbSet<StaffMember> _set;

        public StaffMemberRepository(DDDSample1DbContext ctx)
            : base(ctx.StaffMembers)
        {
            _set = ctx.StaffMembers;
        }

        public async Task<StaffMember> GetByCodeAsync(string code) =>
            await _set.Where(x => x.Code == code).FirstOrDefaultAsync();

        public async Task<IEnumerable<StaffMember>> SearchAsync(string code, string name)
        {
            var q = _set.AsQueryable();
            if (!string.IsNullOrWhiteSpace(code)) q = q.Where(x => x.Code.Contains(code));
            if (!string.IsNullOrWhiteSpace(name)) q = q.Where(x => x.Name.Contains(name));
            return await q.ToListAsync();
        }
    }
}
