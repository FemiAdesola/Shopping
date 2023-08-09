using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.PortableExecutable;

namespace Backend.Model
{
    public class Cart : BaseModel
    {
        public string UserId { get; set; }
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

        [NotMapped]
         public string StripePaymentIntentId { get; set; }

        [NotMapped]
        public string ClientSecret { get; set; }
        
        [NotMapped]
        public double CartTotal { get; set; }
    }
}