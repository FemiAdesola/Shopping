using Backend.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database
{
    public class AppDbContext : IdentityDbContext
    {
        static AppDbContext()
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
        private readonly IConfiguration _config;
        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration config) : base(options) => _config = config;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            var connString = _config.GetConnectionString("DefaultConnection");
            optionsBuilder
                .UseNpgsql(
                    connString)
                .UseSnakeCaseNamingConvention();
        }

           public DbSet<AppUser> AppUsers { get; set; }  = null!;
    }
}