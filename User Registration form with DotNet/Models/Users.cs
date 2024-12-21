using Microsoft.AspNetCore.Identity;

namespace Forms_MVP.Models
{
    public class Users: IdentityUser
    {
        public string? FullName { get; set; }
    }
}
