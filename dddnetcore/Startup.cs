using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using DDDSample1.Infrastructure;
using DDDSample1.Domain.Categories;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Domain.Families;
using DDDSample1.Infrastructure.Families;
using DDDSample1.Domain.Products;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Domain.Shared;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.VesselTypes;
using DDDSample1.Infrastructure.VesselTypes;
using DDDSample1.Domain.Qualifications;
using DDDSample1.Infrastructure.Qualifications;
using DDDSample1.Domain.Representatives;
using DDDSample1.Infrastructure.Representatives;
using DDDSample1.Domain.Docks;
using DDDSample1.Infrastructure.Docks;
using DDDNetCore.Domain.Vessels;
using DDDNetCore.Infraestructure.Vessels;
using DDDSample1.Domain.Staff;
using DDDSample1.Infrastructure.Staff;
using DDDSample1.Domain.ShippingAgentOrganizations;
using DDDSample1.Infrastructure.ShippingAgentOrganizations;
using DDDSample1.Domain.StorageAreas;
using DDDSample1.Infrastructure.StorageAreas;
using DDDSample1.Domain.PhysicalResources;
using DDDSample1.Infrastructure.PhysicalResources;
using DDDSample1.Domain.VesselVisitNotifications;
using DDDSample1.Infrastructure.VesselVisitNotifications;

namespace DDDSample1
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

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

            services.AddCors(options =>
                {
                    options.AddPolicy( 
                        name: MyAllowSpecificOrigins,
                        builder =>
                            {
                                builder.AllowAnyOrigin()
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();
                            });
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

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });

            var scopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
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
            using (var scope = scopeFactory.CreateScope())
            {
                var ctx = scope.ServiceProvider.GetRequiredService<DDDSample1.Infrastructure.DDDSample1DbContext>();
                if (!ctx.Representatives.Any() || !ctx.ShippingAgentOrganizations.Any())
                {
                    var rep1 = Representative.CreateSubmitted(new RepresentativeId("220000000"), "Rep1", "PT", "rep1@rep.pt", 910000000);
                    var rep2 = Representative.CreateSubmitted(new RepresentativeId("210000000"), "Rep2", "PT", "rep2@rep.pt", 930000000);
                    ctx.Representatives.AddRange(rep1, rep2);
                    ctx.SaveChanges();

                    var org = new ShippingAgentOrganization(
                        "Organization1",
                        "Org1",
                        "Rua do Teste, 123, Porto",
                        500000000,
                        new List<Representative> { rep1, rep2 }
                    );
                    ctx.ShippingAgentOrganizations.Add(org);
                    ctx.SaveChanges();
                }
                if (!ctx.VesselTypes.Any())
                {
                    ctx.VesselTypes.AddRange(new[] { new VesselType("Type1", "Carqueiro Pequeno", 27, 3, 3, 3) });
                    ctx.VesselTypes.AddRange(new[] { new VesselType("Type2", "Carqueiro Médio", 64, 4, 4, 4) });
                    ctx.SaveChanges();
                }
                if (!ctx.Docks.Any())
                {
                    var type1 = ctx.VesselTypes.FirstOrDefault(vt => vt.Name == "Type1");

                    if (type1 == null)
                        throw new Exception("VesselType 'Type1' não foi encontrado na base de dados.");

                    var dock1 = new Dock(
                        name: "Dock1",
                        locationx: -3,
                        locationz: 17,
                        locationorientation: 90,
                        length: 7,
                        depth: 2,
                        maxDraft: 12,
                        capacity: 500,
                        vesselTypes: new List<VesselType> { type1 }
                    );
                    
                    var type2 = ctx.VesselTypes.FirstOrDefault(vt => vt.Name == "Type2");

                    if (type1 == null)
                        throw new Exception("VesselType 'Type2' não foi encontrado na base de dados.");

                    var dock2 = new Dock(
                        name: "Dock2",
                        locationx: 6,
                        locationz: 17,
                        locationorientation: 90,
                        length: 7,
                        depth: 2,
                        maxDraft: 12,
                        capacity: 500,
                        vesselTypes: new List<VesselType> { type2 }
                    );

                    ctx.Docks.AddRange(new[] { dock1, dock2 });
                    ctx.SaveChanges();

                    if (!ctx.StorageAreas.Any())
                    {
                        ctx.StorageAreas.AddRange(new[]
                        {
                            DDDSample1.Domain.StorageAreas.StorageArea.CreateSubmitted(
                                "Warehouse", 7.2f, -7.2f, 205.0f, 3000, 1200, new List<Dock>()
                            ),
                            DDDSample1.Domain.StorageAreas.StorageArea.CreateSubmitted(
                                "Warehouse", -10.0f, 2.1f, 0.0f, 1300, 10, new List<Dock> { dock1 }
                            ),
                            DDDSample1.Domain.StorageAreas.StorageArea.CreateSubmitted(
                                "Yard", 10.2f, 5.3f, 90.0f, 4000, 1000, new List<Dock> { dock1 }
                            )
                        });
                        ctx.SaveChanges();
                    }
                }
                if (!ctx.PhysicalResources.Any())
                {
                    var qualifications = ctx.Qualifications.ToList();
                    ctx.PhysicalResources.AddRange(new[]
                    {
                        DDDSample1.Domain.PhysicalResources.PhysicalResource.CreateSubmitted( 
                            "STS001", 
                            "Fixed Crane", 
                            "A crane that is fixed to a dock.", 
                            new TimeSpan(0, 0, 0), new TimeSpan(23, 59, 59), 
                            new TimeSpan(0, 0, 0), new TimeSpan(23, 59, 59), 
                            200, 
                            null, 
                            0, 
                            qualifications, 
                            ctx.Docks.First()
                        ),
                        DDDSample1.Domain.PhysicalResources.PhysicalResource.CreateSubmitted(
                            "CR002", 
                            "Mobile Crane", 
                            "A crane that is mobile.", 
                            new TimeSpan(0, 0, 0), new TimeSpan(23, 59, 59), 
                            new TimeSpan(0, 0, 0), new TimeSpan(23, 59, 59), 
                            50, 
                            null, 
                            5,
                            qualifications, 
                            null
                        ),
                        DDDSample1.Domain.PhysicalResources.PhysicalResource.CreateSubmitted(
                            "TR001", 
                            "Truck", 
                            "A truck.", 
                            new TimeSpan(8, 0, 0), new TimeSpan(22, 00, 00), 
                            null, null, 
                            50, 
                            100, 
                            10, 
                            qualifications, 
                            null
                        )
                    });
                    ctx.SaveChanges();
                }
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
                if (!ctx.StaffMembers.Any())
                {
                    ctx.StaffMembers.AddRange(
                        StaffMember.Create("EMP001", "Alice", "alice@port.com"),
                        StaffMember.Create("EMP002", "Bruno Costa", "bruno@port.com")
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

            services.AddTransient<IFamilyRepository, FamilyRepository>();
            services.AddTransient<FamilyService>();

            services.AddTransient<IProductRepository,ProductRepository>();
            services.AddTransient<ProductService>();

            services.AddTransient<IVesselTypeRepository, VesselTypeRepository>();
            services.AddTransient<VesselTypeService>();

            services.AddTransient<IQualificationRepository, QualificationRepository>();
            services.AddTransient<QualificationService>();

            services.AddTransient<IRepresentativeRepository, RepresentativeRepository>();
            services.AddTransient<RepresentativeService>();

            services.AddTransient<IDockRepository, DockRepository>();
            services.AddTransient<DockService>();

            services.AddScoped<IVesselRepository, VesselRepository>();

            services.AddTransient<IStaffMemberRepository, StaffMemberRepository>();
            services.AddTransient<StaffMemberService>();

            services.AddTransient<IShippingAgentOrganizationRepository, ShippingAgentOrganizationRepository>();
            services.AddTransient<ShippingAgentOrganizationService>();

            services.AddTransient<IStorageAreaRepository, StorageAreaRepository>();
            services.AddTransient<StorageAreaService>();

            services.AddTransient<IPhysicalResourceRepository, PhysicalResourceRepository>();
            services.AddTransient<PhysicalResourceService>();

            services.AddTransient<IVvnRepository, VvnRepository>();
            services.AddTransient<VvnService>();
        }
    }
}
