using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.DTOs.OrderDTO
{
    public class OrderCreateDTO
    {
        [Required]
        public string PickupName { get; set; }
        [Required]
        public string PickupPhoneNumber { get; set; }
        [Required]
        public string PickupEmail { get; set; }

        public string AppUserId { get; set; }
        public double OrderTotal { get; set; }

        public string StripePaymentIntentID { get; set; }
        public string Status { get; set; }
        public int TotalItems { get; set; }
        public IEnumerable<OrderDetailsDTO> OrderDetailsDTO{ get; set; }
    }
}