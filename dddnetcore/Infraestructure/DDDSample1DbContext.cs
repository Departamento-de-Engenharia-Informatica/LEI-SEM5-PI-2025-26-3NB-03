using DDDSample1.Domain.Categories;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Qualifications;
using DDDSample1.Domain.Representatives;
using DDDSample1.Domain.ShippingAgentOrganizations;
using DDDSample1.Domain.StorageAreas;
using DDDSample1.Domain.PhysicalResources;
using DDDSample1.Domain.VesselVisitNotifications;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.PhysicalResources;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Infrastructure.Qualifications;
using DDDSample1.Infrastructure.Representatives;
using DDDSample1.Infrastructure.ShippingAgentOrganizations;
using DDDSample1.Infrastructure.StorageAreas;
using DDDSample1.Infrastructure.PhysicalResources;
using DDDSample1.Infrastructure.VesselVisitNotifications;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Family> Families { get; set; }
        public DbSet<Qualification> Qualifications { get; set; }
        public DbSet<Representative> Representatives { get; set; }
        public DbSet<ShippingAgentOrganization> ShippingAgentOrganizations { get; set; }
        public DbSet<StorageArea> StorageAreas { get; set; }
        public DbSet<PhysicalResource> PhysicalResources { get; set; }
        public DbSet<VesselVisitNotification> VesselVisitNotifications { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new QualificationEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RepresentativeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ShippingAgentOrganizationEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new StorageAreaEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PhysicalResourceEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new VvnEntityTypeConfiguration());
        }
    }
}