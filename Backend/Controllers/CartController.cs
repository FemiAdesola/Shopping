using Backend.Extension;
using Backend.Model;
using Backend.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Backend.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly AppDbContext _context;
        private ApiResponse _response;

        public CartController(
        AppDbContext context
        )
        {
            _context = context;
            _response = new ApiResponse();
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> AddOrUpdateCart(
            string userId, 
            int productId, 
            int updateQuantityBy
            )
        {
            Cart cart = _context.Carts.Include(u=>u.CartItems).FirstOrDefault(u => u.UserId == userId);
            Product product = _context.Products.FirstOrDefault(u => u.Id == productId);
            if(product == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                return BadRequest(_response);
            }

            if (cart == null && updateQuantityBy > 0)
            {
                //create a  cart & add cart item

                Cart newCart = new() { UserId = userId };
                _context.Carts.Add(newCart);
                _context.SaveChanges();

                CartItem newCartItem = new()
                {
                    ProductId = productId,
                    Quantity = updateQuantityBy,
                    CartId = newCart.Id,
                    Product = null // for not allow to create new product 
                };
                _context.CartItems.Add(newCartItem);
                _context.SaveChanges();
            }

            return _response;
        }
    }
}