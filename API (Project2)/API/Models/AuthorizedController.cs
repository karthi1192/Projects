using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    [Authorize]

    [Route("api/[controller]")]

    [ApiController]

    public class AuthorizedController : ControllerBase

    {

        [HttpGet("getData")]

        

        public IActionResult GetAuthorized()
        
        {
         

            var userName = User.Identity.Name;

                   
            return Ok(new { message = $"Hello {userName}, You have access to your data!! "});
        
        }
    }
}
