using System.Net;
using Backend.Database;
using Backend.DTOs.OrderDTO;
using Backend.Extension;
using Backend.Model;
using Backend.Helper;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

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

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetOrders(
            string? userId, 
            string? searchString, 
            string? status,
            int pageNumber =1, 
            int pageSize=6)
        {
            try
            {
                IEnumerable<Order> orders =
                    _context.Orders.Include(u => u.OrderDetails)
                    .ThenInclude(u => u.Product)
                    .OrderByDescending(u => u.OrderId);

                if (!string.IsNullOrEmpty(userId)){
                    orders = orders.Where(u => u.AppUserId == userId);
                }

                if (!string.IsNullOrEmpty(searchString))
                {
                    orders = orders
                        .Where(u => u.PickupPhoneNumber.ToLower().Contains(searchString.ToLower()) ||
                    u.PickupEmail.ToLower().Contains(searchString.ToLower()) 
                    || u.PickupName.ToLower().Contains(searchString.ToLower()));
                }
                
                if (!string.IsNullOrEmpty(status))
                {
                    orders = orders.Where(u => u.Status.ToLower() == status.ToLower());
                }

                // Paginations 
                Pagination pagination = new()
                {
                    CurrentPage = pageNumber,
                    PageSize = pageSize,
                    TotalRecords = orders.Count(),
                };
                Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pagination));
               //
                _response.Result = orders.Skip((pageNumber-1)*pageSize).Take(pageSize);
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

        [HttpPut("{id:int}")]
        public async Task<ActionResult<ApiResponse>>UpdateOrder(int id, [FromBody] OrderUpdateDTO orderUpdateDTO)
        {
            try
            {
                if (orderUpdateDTO == null || id != orderUpdateDTO.OrderId)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest();
                }

                Order orderFromDb = _context.Orders.FirstOrDefault(u => u.OrderId == id)!;
                if (orderFromDb == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest();
                }
                // for checking if orer is not null
                if (!string.IsNullOrEmpty(orderUpdateDTO.PickupName))
                {
                    orderFromDb.PickupName = orderUpdateDTO.PickupName;
                }
                if (!string.IsNullOrEmpty(orderUpdateDTO.PickupPhoneNumber))
                {
                    orderFromDb.PickupPhoneNumber = orderUpdateDTO.PickupPhoneNumber;
                }

                if (!string.IsNullOrEmpty(orderUpdateDTO.PickupEmail))
                {
                    orderFromDb.PickupEmail = orderUpdateDTO.PickupEmail;
                }
                if (!string.IsNullOrEmpty(orderUpdateDTO.Status))
                {
                    orderFromDb.Status = orderUpdateDTO.Status;
                }
                if (!string.IsNullOrEmpty(orderUpdateDTO.StripePaymentIntentID))
                {
                    orderFromDb.StripePaymentIntentID = orderUpdateDTO.StripePaymentIntentID;
                }

                _context.SaveChanges();
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;
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
    }
}