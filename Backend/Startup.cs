using Backend.Database;
using Backend.Model;
using Backend.Services.Implementation;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Identity;

namespace Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<AppDbContext>();
            services.AddHttpContextAccessor();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            
            services.AddScoped<IFileStorage, LocalFileStorage>(); // for adding image files

            services.AddIdentity<AppUser, IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>();
        
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //Configure the HTTP request pipeline.
                if (env.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}