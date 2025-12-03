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

            builder.Property(o => o.Code)
                .IsRequired();
            builder.HasIndex(o => o.Code)
                .IsUnique();
            builder.Property(o => o.Type)
                .IsRequired();
            builder.Property(o => o.Description)
                .IsRequired();

            builder.Property(o => o.WeekdayStart);
            builder.Property(o => o.WeekdayFinish);
            builder.Property(o => o.WeekendStart);
            builder.Property(o => o.WeekendFinish);

            builder.Property(o => o.ContainerCapacity)
                .IsRequired();
            builder.Property(o => o.AverageSpeed);

            builder.Property(o => o.SetupTime);

            builder.Property(o => o.AvailabilityStatus);
            builder.Property(o => o.Active);
        }
    }
}