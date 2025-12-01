namespace DDDSample1.Domain.Staff {
  public record CreateStaffMemberDto(string Code, string Name, string Email);
  public record UpdateStaffMemberDto(string Name, string Email);
  public record StaffMemberViewDto(string Code, string Name, string Email);
}
