using Backend.Extension;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Database;
using System.Text;
using System.Net;
using Stripe;

namespace Backend.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly AppDbContext _context;
        private ApiResponse _response;
        private readonly IConfiguration _config;

        public PaymentController(
        AppDbContext context,
        IConfiguration config
        )
        {
            _context = context;
            _response = new ApiResponse();
            _config = config;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> MakePayment(string userId)
        {
            // First we need to get the cart items from db
            Cart cart = _context.Carts
                .Include(u => u.CartItems)
                .ThenInclude(u => u.Product)
                .FirstOrDefault(u => u.UserId == userId);

            if (cart == null || cart.CartItems == null || cart.CartItems.Count() == 0)
            {
                _response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                return BadRequest(_response);
            }

            #region Create Payment Intent

            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
            cart.CartTotal = cart.CartItems.Sum(u => u.Quantity * u.Product.Price);

            PaymentIntentCreateOptions options = new()
            {
                Amount = (int)(cart.CartTotal * 100),
                Currency = "eur",
                PaymentMethodTypes = new List<string>
                  {
                    "card",
                  },
            };

            PaymentIntentService service = new();
            PaymentIntent response = service.Create(options);
            cart.StripePaymentIntentId = response.Id;
            cart.ClientSecret = response.ClientSecret;

            #endregion

            _response.Result = cart;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }
    }
}