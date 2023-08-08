using System.Net;
using Backend.Database;
using Backend.DTOs;
using Backend.Extension;
using Backend.Model;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly AppDbContext _context;
        private ApiResponse _response;
        private readonly IFileStorage _fileStorage;
        private readonly string containerName = "products";

        public ProductController(
        AppDbContext context,
        IFileStorage fileStorage
        )
        {
            _context = context;
            _response = new ApiResponse();
            _fileStorage = fileStorage;

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

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateProduct([FromForm]ProductCreateDTO productCreateDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (productCreateDTO.File == null || productCreateDTO.File.Length == 0)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        return BadRequest();
                    }
    
                    Product product = new()
                    {
                        Title = productCreateDTO.Title,
                        Price = productCreateDTO.Price,
                        Category = productCreateDTO.Category,
                        Description = productCreateDTO.Description,
                        ProductType = productCreateDTO.ProductType,
                        Image = await _fileStorage.SaveFile(containerName, productCreateDTO.File)
                    };

                    _context.Add(product);
                    await _context.SaveChangesAsync();
                    _response.Result = product.Id;
                    _response.StatusCode=HttpStatusCode.Created;
                     return CreatedAtRoute("GetProduct", new { id = product.Id }, _response);
                }
                else
                {
                    _response.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}