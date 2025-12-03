using DDDSample1.Domain.StorageAreas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.StorageAreas
{
    internal class StorageAreaEntityTypeConfiguration : IEntityTypeConfiguration<StorageArea>
    {
        public void Configure(EntityTypeBuilder<StorageArea> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("StorageArea", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
            builder.Property(b => b.Type)
                .IsRequired();
            builder.Property(b => b.LocationX)
                .IsRequired();
            builder.Property(b => b.LocationZ)
                .IsRequired();
            builder.Property(b => b.LocationOrientation)
                .IsRequired();
            builder.Property(b => b.MaximumCapacity)
                .IsRequired();
            builder.Property(b => b.CurrentOccupancy)
                .IsRequired();

            builder.HasMany<StorageAreaDock>("_storageAreaDocks")
                .WithOne(sad => sad.StorageArea)
                .HasForeignKey(sad => sad.StorageAreaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
