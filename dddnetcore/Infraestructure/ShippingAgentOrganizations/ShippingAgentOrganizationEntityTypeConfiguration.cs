using DDDSample1.Domain.ShippingAgentOrganizations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.ShippingAgentOrganizations
{
    internal class ShippingAgentOrganizationEntityTypeConfiguration : IEntityTypeConfiguration<ShippingAgentOrganization>
    {
        public void Configure(EntityTypeBuilder<ShippingAgentOrganization> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("ShippingAgentOrganizations", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.Property(o => o.LegalName)
                .IsRequired();
            builder.Property(o => o.AltName)
                .IsRequired();
            builder.Property(o => o.Address)
                .IsRequired();
            builder.Property(o => o.TaxNumber)
                .IsRequired();
            builder.HasMany(o => o.Representatives)
                .WithOne(r => r.ShippingAgentOrganization)
                .HasForeignKey(r => r.ShippingAgentOrganizationId)
                .IsRequired();
        }
    }
}