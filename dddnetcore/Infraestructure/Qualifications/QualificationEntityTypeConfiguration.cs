using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Qualifications;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Qualifications
{
    public class QualificationEntityTypeConfiguration : IEntityTypeConfiguration<Qualification>
    {
        public void Configure(EntityTypeBuilder<Qualification> builder)
        {
            //builder.ToTable("Qualifications");

            builder.HasKey(q => q.Id);
            builder.Property(q => q.Id)
                   .HasConversion(new EntityIdValueConverter<QualificationId>())
                   .ValueGeneratedNever();

            builder.Property(q => q.Code)
                   .IsRequired()
                   .HasMaxLength(64);

            builder.HasIndex(q => q.Code).IsUnique();

            builder.Property(q => q.Name)
                   .IsRequired()
                   .HasMaxLength(200);
        }
    }
}
