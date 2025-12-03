using DDDSample1.Domain.PhysicalResources;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.PhysicalResources
{
    public class PhysicalResourceQualificationConfiguration : IEntityTypeConfiguration<PhysicalResourceQualification>
    {
        public void Configure(EntityTypeBuilder<PhysicalResourceQualification> builder)
        {
            builder.HasKey(prq => new { prq.PhysicalResourceId, prq.QualificationCode });

            builder.Property(prq => prq.PhysicalResourceId)
                   .HasConversion(
                       id => id,
                       guid => guid
                   );

            builder.Property(prq => prq.QualificationCode)
                   .HasConversion(
                       id => id,
                       guid => guid
                   );

            builder.HasOne(prq => prq.PhysicalResource)
                   .WithMany("_physicalResourceQualifications")
                   .HasForeignKey(prq => prq.PhysicalResourceId)
                   .HasPrincipalKey(pr => pr.Id)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(prq => prq.Qualification)
                   .WithMany()
                   .HasForeignKey(prq => prq.QualificationCode)
                   .HasPrincipalKey(d => d.Code)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
