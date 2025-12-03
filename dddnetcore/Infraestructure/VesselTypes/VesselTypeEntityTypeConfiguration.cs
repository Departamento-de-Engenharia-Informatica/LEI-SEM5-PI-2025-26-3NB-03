using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.VesselTypes;

namespace DDDSample1.Infrastructure.VesselTypes
{
    internal class VesselTypeEntityTypeConfiguration : IEntityTypeConfiguration<VesselType>
    {
        public void Configure(EntityTypeBuilder<VesselType> builder)
        {

            builder.HasKey(v => v.Id);
            builder.Property(v => v.Name).IsRequired();
            builder.Property(v => v.Description).IsRequired();
           
        }
    }
}