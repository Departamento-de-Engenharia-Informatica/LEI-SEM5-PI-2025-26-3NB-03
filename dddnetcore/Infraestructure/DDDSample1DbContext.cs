using DDDSample1.Domain.Categories;
using DDDSample1.Domain.Families;
<<<<<<< HEAD
using DDDSample1.Domain.VesselTypes;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Infrastructure.VesselTypes;
using System.Diagnostics.Contracts;
=======
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Representatives;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Domain.VesselVisitNotifications;
using DDDSample1.Infrastructure.VesselVisitNotifications;
using DDDSample1.Infrastructure.Representatives;
using Microsoft.EntityFrameworkCore;
>>>>>>> c86068a5f4621245df15c19cdf6cf8d2f12c7fab


namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Family> Families { get; set; }

<<<<<<< HEAD
        public DbSet<VesselType> VesselTypes { get; set; }
=======
        public DbSet<Representative> Representatives { get; set; }

        public DbSet<VesselVisitNotification> VesselVisitNotifications { get; set; }

>>>>>>> c86068a5f4621245df15c19cdf6cf8d2f12c7fab

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
<<<<<<< HEAD
            modelBuilder.ApplyConfiguration(new VesselTypeEntityTypeConfiguration());
=======
            modelBuilder.ApplyConfiguration(new VvnEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RepresentativeEntityTypeConfiguration());
>>>>>>> c86068a5f4621245df15c19cdf6cf8d2f12c7fab
        }
    }
}