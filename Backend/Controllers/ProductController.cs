using System.Net;
using Backend.Database;
using Backend.DTOs;
using Backend.Extension;
using Backend.Model;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

                    _context.Products.Add(product);
                    await _context.SaveChangesAsync();
                    _response.Result = product;
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

        [HttpPut("{id:int}")]
        public async Task<ActionResult<ApiResponse>> UpdateProduct(int id, [FromForm]ProductUpdateDTO productUpdateDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (productUpdateDTO == null || id !=productUpdateDTO.Id)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        return BadRequest();
                    }

                    // for update
                    Product productToUpdate = await _context.Products.FirstOrDefaultAsync(u => u.Id == id);
                    // Product productToUpdate = await _context.Products.FindAsync(id);
                    if (productToUpdate == null)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        return BadRequest();
                    }
                    //


                    productToUpdate.Title = productUpdateDTO.Title;
                    productToUpdate.Price = productUpdateDTO.Price;
                    productToUpdate.Category = productUpdateDTO.Category;
                    productToUpdate.Description = productUpdateDTO.Description;
                    productToUpdate.ProductType = productUpdateDTO.ProductType;
                    
                    // for update image
                    if(productToUpdate.Image!=null)
                    {
                        productToUpdate.Image = await _fileStorage.UpdateFile(containerName, productUpdateDTO.File,productToUpdate.Image);
                    }
                   
                    _context.Products.Update(productToUpdate);
                    await _context.SaveChangesAsync();
                    _response.Result = productToUpdate;
                    _response.StatusCode=HttpStatusCode.NoContent;
                    return  Ok(_response);
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

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ApiResponse>> DeleteProduct(int id)
        {
            try
            {
                if (id == 0)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    return BadRequest();
                }
                
                Product productToBeDeleted = await _context.Products.FirstOrDefaultAsync(u => u.Id == id);
                if (productToBeDeleted == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    return BadRequest();
                }

                await _fileStorage.DeleteFile(containerName, productToBeDeleted.Image);
                
                // for adding delay 
                int milliseconds = 1000;
                Thread.Sleep(milliseconds);

                _context.Products.Remove(productToBeDeleted);
                await _context.SaveChangesAsync();
                // _response.Result = productToBeDeleted;
                _response.StatusCode=HttpStatusCode.NoContent;
                return  Ok(_response);
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