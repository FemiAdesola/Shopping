using System.Net;
using Backend.Database;
using Backend.Extension;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly AppDbContext _context;
        private ApiResponse _response;

        public ProductController(
        AppDbContext context
        )
        {
            _context = context;
            _response = new ApiResponse();

        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            _response.Result =  _context.Products;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpGet("{id:int}", Name = "GetProduct")]
        public async Task<IActionResult> GetProduct(int id)
        {
            if(id == 0)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                return BadRequest(_response);
            }
            Product product = _context.Products.FirstOrDefault(u => u.Id == id)!;
            if (product == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                return NotFound(_response);
            }
            _response.Result = product;
            _response.StatusCode = HttpStatusCode.OK;
             return Ok(_response);
        }
    }
}