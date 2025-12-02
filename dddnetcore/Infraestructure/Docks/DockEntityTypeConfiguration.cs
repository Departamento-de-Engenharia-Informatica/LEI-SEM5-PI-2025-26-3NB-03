using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.VesselTypes;
using DDDSample1.Domain.Docks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Infrastructure.Docks
{
    internal class DockEntityTypeConfiguration : IEntityTypeConfiguration<Dock>
    {
        public void Configure(EntityTypeBuilder<Dock> builder)
        {
        builder.HasKey(d => d.Id);

        builder.Property(d => d.Name).IsRequired();

         builder.Property(d => d.Id)
        .HasConversion(id => id.Value, value => new DockId(value));

        builder.HasMany(d => d.VesselTypes)
       .WithOne(v => v.Dock)
       .HasForeignKey(v => v.DockId);
       

        // Mapeia muitos-para-muitos
        //builder
         //   .HasMany(d => d.VesselTypes)
         //   .WithMany(v => v.Docks)
          
          
        }  


    }
}