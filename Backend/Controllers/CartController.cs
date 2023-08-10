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
            Cart cart = _context.Carts
                .Include(u=>u.CartItems)
                .FirstOrDefault(u => u.UserId == userId);
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
            else
            {
                //checking if the shopping cart exists
                CartItem cartItemInCart = cart.CartItems.FirstOrDefault(
                    u => u.ProductId == productId);
                if (cartItemInCart == null)
                {
                    //item does not exist in current cart
                    CartItem newCartItem = new()
                    {
                        ProductId = productId,
                        Quantity = updateQuantityBy,
                        CartId = cart.Id,
                        Product = null
                    };
                    _context.CartItems.Add(newCartItem);
                    _context.SaveChanges();
                }
                else
                {
                    //item already exist in the cart and we have to update quantity
                    int newQuantity = cartItemInCart.Quantity + updateQuantityBy;
                    if (updateQuantityBy == 0 || newQuantity <= 0)
                    {
                        //remove cart item from cart and if it is the only item then remove cart
                        _context.CartItems.Remove(cartItemInCart);
                        if (cart.CartItems.Count() == 1)
                        {
                            _context.Carts.Remove(cart);
                        }
                        _context.SaveChanges();
                    }
                    else
                    {
                        cartItemInCart.Quantity = newQuantity;
                        _context.SaveChanges();
                    }
                }
            }
            return _response;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetCart(string userId)
        {
            try
            {
                Cart cart;
                if (string.IsNullOrEmpty(userId))
                {
                    cart = new Cart();
                }
                else
                {
                    cart= _context.Carts
                        .Include(u => u.CartItems)
                        .ThenInclude(u => u.Product)
                        .FirstOrDefault(u => u.UserId == userId);
                }
                //  for get cart item total price
                if (cart.CartItems != null && cart.CartItems.Count > 0) {
                    cart.CartTotal = cart.CartItems.Sum(u => u.Quantity * u.Product.Price);
                }
                //
                _response.Result = cart;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages
                    = new List<string>() { ex.ToString() };
                _response.StatusCode = HttpStatusCode.BadRequest;
            }
            return _response;
        }
    }
}