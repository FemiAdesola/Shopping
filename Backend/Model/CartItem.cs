using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    public class CartItem : BaseModel
    {
        public int ProductId { get; set; }

       [ForeignKey("ProductId")]
        public Product Product { get; set; } = new();
        public int Quantity { get; set; }
        public int CartId { get; set; }
    }
}