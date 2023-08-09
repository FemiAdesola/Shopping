using Microsoft.AspNetCore.Authorization;
using Backend.Helper;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class UserAuthController : BaseApiController
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<string>> GetSomething()
        {
            return "You are authenticated";
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = SD.Role_Admin)]
        public async Task<ActionResult<string>> GetSomething(int someIntValue)
        {
            // An authorization is when someone is Authentication + Some access/roles
            return "You are Authorized with Role of Admin";
        }
    }
}