using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.VesselVisitNotifications;

namespace DDDSample1.Infrastructure.VesselVisitNotifications
{
    internal class VvnEntityTypeConfiguration : IEntityTypeConfiguration<VesselVisitNotification>
    {
        public void Configure(EntityTypeBuilder<VesselVisitNotification> builder)
        {
            builder.HasKey(b => b.Id);


            builder.Property(b => b.Id)
                .HasConversion(
                    id => id.AsGuid(),
                    guid => new VvnId(guid))
                .ValueGeneratedNever();

            builder.HasIndex(b => new { b.OrganizationId, b.Status });
            builder.HasIndex(b => new { b.VesselIMO, b.SubmittedAt });

            builder.Property(b => b.VesselIMO).IsRequired();
            builder.Property(b => b.VesselName).IsRequired();
            builder.Property(b => b.OrganizationId).IsRequired();
            builder.Property(b => b.RepresentativeId).IsRequired();
            builder.Property(b => b.RepresentativeName).IsRequired();
        }
    }
}
