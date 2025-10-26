using DDDSample1.Domain.PhysicalResources;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.PhysicalResources
{
    internal class PhysicalResourceEntityTypeConfiguration : IEntityTypeConfiguration<PhysicalResource>
    {
        public void Configure(EntityTypeBuilder<PhysicalResource> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("PhysicalResources", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.Property(o => o.Description)
                .IsRequired();
            builder.Property(o => o.OperationalCapacity)
                .IsRequired();
            builder.Property(o => o.AvailabilityStatus)
                .IsRequired();
        }
    }
}