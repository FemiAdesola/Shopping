using Backend.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database
{
    public class AppDbContext : IdentityDbContext <AppUser>
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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().HasData(
                    new Product
                    {
                        Id = 1,
                        Title = "Adidas shoe",
                        Price = 200.99,
                        Description = "AMen's Daily 3.0 Skate Shoe",
                        Category = "Shoes",
                        ProductType = "Itanlian Shoes",
                        Image = "https://source.unsplash.com/164_6wVEHfI"
                    },
                new Product
                {
                    Id = 2,
                    Title = "Math text book",
                    Price = 299.99,
                    Description = "Mastering Essential Math Skills Book 2, Bilingual Edition - English/Spanish",
                    Category = "Book",
                    ProductType = "Science Book",
                    Image = "https://source.unsplash.com/9DaOYUYnOls"
                },
                new Product
                {
                    Id = 3,
                    Title = "Macbook pro 16",
                    Price = 2145,
                    Description = "Apple 2023 MacBook Pro Laptop M2 Pro chip with 12‑core CPU and 19‑core GPU: 16.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 1TB SSD Storage",
                    Category = "Electronics",
                    ProductType= "Laptop",
                    Image = "https://source.unsplash.com/1SAnrIxw5OY"
                },
                new Product
                {
                    Id = 4,
                    Title = "Plastic chair",
                    Price = 49.99,
                    Description = "Basics Folding Plastic Chair with 350-Pound Capacity - Black, 6-Pack",
                    Category = "Furniture",
                    ProductType = "Dinning Chair",
                    Image = "https://source.unsplash.com/3neSwyntbQ8"
                },
                new Product
                {
                    Id = 5,
                    Title = "T-shirt",
                    Price = 80.99,
                    Description = "Gildan Men's Crew T-Shirts, Multipack, Style G1100",
                    Category = "Cloth",
                    ProductType = "Shirt",
                    Image = "https://source.unsplash.com/ojZ4wJNUM5w"
                },
                new Product
                {
                    Id = 6,
                    Title = "Toyota CHR",
                    Price = 30000,
                    Description = "Gildan Men's Crew T-Shirts, Multipack, Style G1100",
                    Category = "Vehicle",
                    ProductType = "Car",
                    Image = "https://source.unsplash.com/50cIn5ELxLo"
                },
                new Product
                {
                    Id = 7,
                    Title = "Leather bag",
                    Price = 78.98,
                    Description = "Kattee Vintage Genuine Leather Tote Shoulder Bag for Women Satchel Handbag with Top Handles",
                    Category = "Bag",
                    ProductType = "Leather Bag",
                    Image = "https://source.unsplash.com/_H0fjILH5Vw"
                },
                new Product
                {
                    Id = 8,
                    Title = "Motorcycle 2006",
                    Price = 799.99,
                    Description = "New-Ray 1:12 Motorcycle 2006 Kawasaki Zx-10R- Sport Bike",
                    Category = "Vehicle",
                    ProductType = "Bike",
                    Image = "https://source.unsplash.com/tG36rvCeqng"
                },
                new Product
                {
                    Id = 9,
                    Title = "Body lotion(vaseline)",
                    Price = 30.23,
                    Description = "Vaseline hand and body lotion Intensive Care Moisturizer for Dry Skin Essential Healing Clinically",
                    Category = "Others",
                    ProductType = "Body lotion",
                    Image = "https://source.unsplash.com/F39Yk-FM_fg"
                },
                new Product
                {
                    Id = 10,
                    Title = "Iphone 13 Pro Max",
                    Price = 1200.99,
                    Description = "iPhone 13 Pro Max, 128GB, Sierra Blue - Unlocked",
                    Category = "Electronics",
                    ProductType = "Phone",
                    Image = "https://source.unsplash.com/xsGxhtAsfSA"
                },
                new Product
                {
                    Id = 11,
                    Title = "Toyota CHR",
                    Price = 56000,
                    Description = "This wonderful BMW Z4 with San Francisco red exterior color and Ivory white leather is now for sale at SCC in Turku! The car has an incredible list of equipment, such as Harman&Kardo sound reproduction, Adaptive cruise control, Reversing camera and Electrically adjustable seats with memory function. You don't come across something like this every day, so get this car for yourself today! Tel. 03004722307",
                    Category = "Vehicle",
                    ProductType = "Car",
                    Image = "https://source.unsplash.com/YApiWyp0lqo"
                },
                new Product
                {
                    Id = 12,
                    Title = "Ferragamo BOXYZ bag",
                    Price = 78.98,
                    Description = "Salvatore Ferragamo Boxes Medium Handbag 21H645 Calf Leather Pink 2WAY Shoulder / Brand : Salvatore Ferragamo Model Number : Boxes Medium 21H645 Gtin : 2127123007339 Type : Handbag, Shoulder bag Gender : Women Material Fashion : Leather Leather Fur Type",
                    Category = "Bag",
                    ProductType = "Back Bag",
                    Image = "https://source.unsplash.com/oCXVxwTFwqE"
                },
                new Product
                {
                    Id = 13,
                    Title = "Zero to One",
                    Price = 799.99,
                    Description = "Zero to One explores how companies can better predict the future and take action to ensure that their startup is a success. The author enlivens the book’s key takeaways with his own personal experiences.",
                    Category = "Book",
                    ProductType = "Science Book",
                    Image = "https://source.unsplash.com/xY55bL5mZAM"
                }
            );
        }

           public DbSet<AppUser> AppUsers { get; set; }  = null!;
           public DbSet<Product> Products { get; set; } = null!;
    }
}