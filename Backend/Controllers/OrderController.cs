using System.Net;
using Backend.Database;
using Backend.DTOs.OrderDTO;
using Backend.Extension;
using Backend.Model;
using Backend.Helper;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    public class OrderController: BaseApiController
    {
        private readonly AppDbContext _context;
        private ApiResponse _response;

        public OrderController(
        AppDbContext context
        )
        {
            _context = context;
            _response = new ApiResponse();
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetOrders(string? userId)
        {
            try
            {
               var orders =
                    _context.Orders.Include(u => u.OrderDetails)
                    .ThenInclude(u => u.Product)
                    .OrderByDescending(u => u.OrderId);

                if (!string.IsNullOrEmpty(userId)){
                    _response.Result = orders.Where(u => u.AppUserId == userId);
                }
                else
                {
                    _response.StatusCode = HttpStatusCode.OK;
                    return Ok(_response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages
                     = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ApiResponse>> GetOrder(int? id)
        {
            try
            {
                if (id == 0)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }
                var orders =
                    _context.Orders.Include(u => u.OrderDetails)
                    .ThenInclude(u => u.Product)
                    .Where(u => u.OrderId==id);

                if (orders == null){
                    _response.StatusCode = HttpStatusCode.NotFound;
                    return NotFound(_response);
                }
                _response.Result = orders;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages
                     = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateOrder([FromBody] OrderCreateDTO orderCreateDTO)
        {
            try
            {
                Order order = new()
                {
                    AppUserId = orderCreateDTO.AppUserId,
                    PickupEmail = orderCreateDTO.PickupEmail,
                    PickupName = orderCreateDTO.PickupName,
                    PickupPhoneNumber = orderCreateDTO.PickupPhoneNumber,
                    OrderTotal = orderCreateDTO.OrderTotal,
                    OrderDate = DateTime.Now,
                    StripePaymentIntentID = orderCreateDTO.StripePaymentIntentID,
                    TotalItems = orderCreateDTO.TotalItems,
                    Status= String.IsNullOrEmpty(orderCreateDTO.Status)? SD.status_pending : orderCreateDTO.Status,
                };
                if (ModelState.IsValid)
                {
                    _context.Orders.Add(order);
                    _context.SaveChanges();
                    // for looping throughh order
                    foreach(var orderDetailDTO in orderCreateDTO.OrderDetailsDTO)
                    {
                        OrderDetails orderDetails = new()
                        {
                            OrderId = order.OrderId,
                            ItemName = orderDetailDTO.ItemName,
                            ProductId = orderDetailDTO.ProductId,
                            Price = orderDetailDTO.Price,
                            Quantity = orderDetailDTO.Quantity,
                        };
                        _context.OrderDetails.Add(orderDetails); 
                    }
                    //
                    _context.SaveChanges();
                    _response.Result = order;
                    order.OrderDetails = null;
                    _response.StatusCode = HttpStatusCode.Created;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages
                     = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}