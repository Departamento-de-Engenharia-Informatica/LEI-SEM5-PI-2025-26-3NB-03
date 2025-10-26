using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Staff {
  public interface IStaffMemberRepository : IRepository<StaffMember, StaffMemberId> {
    Task<StaffMember> GetByCodeAsync(string code);
    Task<IEnumerable<StaffMember>> SearchAsync(string code, string name);
  }
}
