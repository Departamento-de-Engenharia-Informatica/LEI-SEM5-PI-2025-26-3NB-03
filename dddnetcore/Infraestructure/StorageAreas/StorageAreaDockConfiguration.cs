using DDDSample1.Domain.StorageAreas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.StorageAreas
{
    public class StorageAreaDockConfiguration : IEntityTypeConfiguration<StorageAreaDock>
    {
        public void Configure(EntityTypeBuilder<StorageAreaDock> builder)
        {
            builder.HasKey(sad => new { sad.StorageAreaId, sad.DockId });

            builder.Property(sad => sad.StorageAreaId)
                   .HasConversion(
                       id => id,
                       guid => guid
                   );

            builder.Property(sad => sad.DockId)
                   .HasConversion(
                       id => id,
                       guid => guid
                   );

            builder.HasOne(sad => sad.StorageArea)
                   .WithMany("_storageAreaDocks")
                   .HasForeignKey(sad => sad.StorageAreaId)
                   .HasPrincipalKey(sa => sa.Id)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(sad => sad.Dock)
                   .WithMany()
                   .HasForeignKey(sad => sad.DockId)
                   .HasPrincipalKey(d => d.Id)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
