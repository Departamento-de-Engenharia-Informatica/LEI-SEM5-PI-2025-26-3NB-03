using DDDSample1.Domain.Representatives;
using DDDSample1.Domain.ShippingAgentOrganizations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.Representatives
{
    internal class RepresentativeEntityTypeConfiguration : IEntityTypeConfiguration<Representative>
    {
        public void Configure(EntityTypeBuilder<Representative> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Representatives", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
            builder.Property(b => b.Name)
                .IsRequired();
            builder.Property(b => b.Nationality)
                .IsRequired();
            builder.Property(b => b.Email)
                .IsRequired();
            builder.Property(b => b.PhoneNumber)
                .IsRequired();
            builder.HasOne<ShippingAgentOrganization>()
                   .WithMany(b => b.Representatives)
                   .HasForeignKey(b => b.ShippingAgentOrganizationId)
                   .IsRequired();
        }
    }
}