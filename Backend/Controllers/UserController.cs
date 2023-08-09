using Backend.DTOs;
using Backend.Extension;
using Backend.Migrations;
using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly AppDbContext _context;
        private ApiResponse _response;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private string _configuration;
        public UserController(
            AppDbContext context,
            IConfiguration configuration,
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager

        )
        {
            _context = context;
            _response = new ApiResponse();
            _configuration = configuration.GetValue<string>("ApiSettings:Secret");
            _userManager = userManager;
            _roleManager = roleManager;
        }

    }
}
