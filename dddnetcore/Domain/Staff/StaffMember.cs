using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.Staff
{
  public class StaffMember : Entity<StaffMemberId>, IAggregateRoot
  {
      protected StaffMember() { }

      public string Code  { get; private set; }
      public string Name  { get; private set; }
      public string Email { get; private set; }

      private StaffMember(StaffMemberId id, string code, string name, string email)
      {
          Id    = id;
          Code  = code;
          Name  = name;
          Email = email;
      }

      public static StaffMember Create(string code, string name, string email)
          => new StaffMember(
              new StaffMemberId(Guid.NewGuid().ToString()),
              code.Trim(),
              name.Trim(),
              email?.Trim()
          );

      public void Update(string name, string email)
      {
          if (!string.IsNullOrWhiteSpace(name)) Name  = name.Trim();
          if (email != null)                    Email = email.Trim();
      }

}
}