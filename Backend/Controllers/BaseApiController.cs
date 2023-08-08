using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    // [Produces(MediaTypeNames.Application.Json)]
    // [Consumes(MediaTypeNames.Application.Json)]
    [Route("api/v1/[controller]s")]
    public abstract class BaseApiController : ControllerBase
    {

    }
}