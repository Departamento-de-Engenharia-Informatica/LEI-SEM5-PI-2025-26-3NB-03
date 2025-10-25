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

            // Índices úteis para pesquisa
            builder.HasIndex(b => new { b.OrganizationId, b.Status });
            builder.HasIndex(b => new { b.VesselIMO, b.SubmittedAt });

            // Constraints simples (se quiseres)
            builder.Property(b => b.VesselIMO).IsRequired();
            builder.Property(b => b.VesselName).IsRequired();
            builder.Property(b => b.OrganizationId).IsRequired();
            builder.Property(b => b.RepresentativeId).IsRequired();
            builder.Property(b => b.RepresentativeName).IsRequired();
        }
    }
}
