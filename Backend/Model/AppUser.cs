using Microsoft.AspNetCore.Identity;

namespace Backend.Model
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; } = null!;
    }
}