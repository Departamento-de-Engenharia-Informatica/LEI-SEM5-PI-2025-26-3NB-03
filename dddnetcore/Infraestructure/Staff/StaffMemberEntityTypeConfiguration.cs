using DDDSample1.Domain.Staff;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Infrastructure.Shared;


namespace DDDSample1.Infrastructure.Staff
{
    public class StaffMemberEntityTypeConfiguration
        : IEntityTypeConfiguration<StaffMember>
    {
        public void Configure(EntityTypeBuilder<StaffMember> builder)
        {
            // builder.ToTable("StaffMembers");

            builder.HasKey(s => s.Id);

                builder.Property(s => s.Id)
                       .HasConversion(new EntityIdValueConverter<StaffMemberId>())
                       .ValueGeneratedNever();

            builder.Property(s => s.Code).IsRequired().HasMaxLength(32);
            builder.Property(s => s.Name).IsRequired().HasMaxLength(128);
            builder.Property(s => s.Email).IsRequired().HasMaxLength(256);
        }
    }
}
