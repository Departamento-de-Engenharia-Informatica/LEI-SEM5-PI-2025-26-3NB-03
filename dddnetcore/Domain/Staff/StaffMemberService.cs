using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Staff {
  public class StaffMemberService {
    private readonly IStaffMemberRepository _repo;
    private readonly IUnitOfWork _uow;

    public StaffMemberService(IStaffMemberRepository repo, IUnitOfWork uow) {
      _repo = repo; _uow = uow;
    }

    public async Task<StaffMemberViewDto> CreateAsync(CreateStaffMemberDto dto) {
      var exists = await _repo.GetByCodeAsync(dto.Code);
      if (exists != null) throw new BusinessRuleValidationException("Staff code already exists");

      var s = StaffMember.Create(dto.Code, dto.Name, dto.Email);
      await _repo.AddAsync(s);
      await _uow.CommitAsync();

      return new StaffMemberViewDto(s.Code, s.Name, s.Email);
    }

    public async Task<StaffMemberViewDto> UpdateAsync(string code, UpdateStaffMemberDto dto) {
      var s = await _repo.GetByCodeAsync(code) ?? throw new BusinessRuleValidationException("Staff not found");
      s.Update(dto.Name, dto.Email);
      await _uow.CommitAsync();
      return new StaffMemberViewDto(s.Code, s.Name, s.Email);
    }

    public async Task<IEnumerable<StaffMemberViewDto>> SearchAsync(string code, string name) {
      var list = await _repo.SearchAsync(code, name);
      return list.Select(s => new StaffMemberViewDto(s.Code, s.Name, s.Email));
    }
  }
}
