using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Vessels;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Domain.Vessels.ValueObjects;


namespace DDDSample1.Infrastructure.Vessels
{
    public class VesselEntityTypeConfiguration : IEntityTypeConfiguration<Vessel>
    {
        public void Configure(EntityTypeBuilder<Vessel> builder)
        {
            // Tabela
            //builder.ToTable("Vessels");

            // Chave primária
            builder.HasKey(v => v.Id);

            // Value Object: ImoNumber
            var imoConverter = new ValueConverter<ImoNumber, string>(
                v => v.Value,
                v => new ImoNumber(v)
                );

            builder.Property(v => v.ImoNumber)
                   .HasConversion(imoConverter)
                   .IsRequired();

            builder.Property(v => v.Name).IsRequired();
            builder.Property(v => v.VesselType).IsRequired();
            builder.Property(v => v.Operator).IsRequired();
        
            
        }
    }
}
