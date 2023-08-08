namespace Backend.DTOs
{
    public class ProductCreateDTO
    {
        public string Title { get; set; } = null!;
        public double Price { get; set; }
        public string Description { get; set; } = null!;
        public IFormFile File { get; set; } = null!;
        public string Category { get; set; } = default!;
        public string ProductType { get; set; } = default!;
    }
}