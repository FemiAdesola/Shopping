using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.DTOs.OrderDTO
{
    public class OrderUpdateDTO
    {
        public int OrderId { get; set; }
        public string PickupName { get; set; }
        public string PickupPhoneNumber { get; set; }
        public string PickupEmail { get; set; }
        public string StripePaymentIntentID { get; set; }
        public string Status { get; set; }
    }
}