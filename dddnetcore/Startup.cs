using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;

using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Infrastructure.Families;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Infrastructure.VesselVisitNotifications;

using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Categories;
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.VesselVisitNotifications;

using DDDSample1.Domain.Qualifications;
using DDDSample1.Infrastructure.Qualifications;

namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DDDSample1DbContext>(opt =>
                {
                    opt.UseInMemoryDatabase("DDDSample1DB");
                    opt.ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>();
                });
            ConfigureMyServices(services);


            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var scopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
            using (var scope = scopeFactory.CreateScope())
            {
                var ctx = scope.ServiceProvider.GetRequiredService<DDDSample1.Infrastructure.DDDSample1DbContext>();
                if (!ctx.VesselVisitNotifications.Any())
                {
                    ctx.VesselVisitNotifications.AddRange(new []
                    {
                        DDDSample1.Domain.VesselVisitNotifications.VesselVisitNotification.CreateSubmitted(
                            "9321483", "MSC Aurora", "ORG-123", "REP-1", "Alice", DateTime.UtcNow.AddDays(-2)
                        ),
                        DDDSample1.Domain.VesselVisitNotifications.VesselVisitNotification.CreateSubmitted(
                            "9706903", "CMA CGM Marco Polo", "ORG-123", "REP-2", "Bruno", DateTime.UtcNow.AddDays(-1)
                        )
                    });
                    ctx.SaveChanges();
                }
            }

            using (var scope = app.ApplicationServices.CreateScope())
            {
                var ctx = scope.ServiceProvider.GetRequiredService<DDDSample1.Infrastructure.DDDSample1DbContext>();

                if (!ctx.Qualifications.Any())
                {
                    ctx.Qualifications.AddRange(
                        Qualification.Create("STS_CRANE", "STS Crane Operator"),
                        Qualification.Create("TRUCK_DRIVER", "Truck Driver")
                    );
                    ctx.SaveChanges();
                }
            }


        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<ICategoryRepository,CategoryRepository>();
            services.AddTransient<CategoryService>();

            services.AddTransient<IProductRepository,ProductRepository>();
            services.AddTransient<ProductService>();

            services.AddTransient<IFamilyRepository,FamilyRepository>();
            services.AddTransient<FamilyService>();

            services.AddTransient<IQualificationRepository, QualificationRepository>();
            services.AddTransient<QualificationService>();


            //services.AddTransient<IRepresentativeRepository, RepresentativeRepository>();
            //services.AddTransient<RepresentativeService>();

            services.AddTransient<IVvnRepository, VvnRepository>();
            services.AddTransient<VvnService>();
        }
    }
}
