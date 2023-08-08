using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Product : BaseModel
    {
        public string Title { get; set; } = null!;
        
        [Range(1,int.MaxValue)]
        public double Price { get; set; }
        public string Description { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Category { get; set; } = default!;
        public string ProductType { get; set; } = default!;
    }
}