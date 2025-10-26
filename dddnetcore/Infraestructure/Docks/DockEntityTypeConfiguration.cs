using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.VesselTypes;
using DDDSample1.Domain.Docks;

namespace DDDSample1.Infrastructure.Docks
{
    internal class DockEntityTypeConfiguration : IEntityTypeConfiguration<Dock>
    {
        public void Configure(EntityTypeBuilder<Dock> builder)
        {
        builder.HasKey(d => d.Id);

        builder.Property(d => d.Name).IsRequired();
        builder.Property(d => d.Location).IsRequired();

        // Mapeia muitos-para-muitos
        builder
            .HasMany(d => d.VesselTypes)
            .WithMany(v => v.Docks)
            //.UsingEntity(j => j.ToTable("DockVesselTypes"))
            ;
        }  


    }
}