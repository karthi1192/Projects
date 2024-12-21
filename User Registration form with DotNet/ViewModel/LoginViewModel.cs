using System.ComponentModel.DataAnnotations;

namespace Forms_MVP.ViewModel
{
    public class LoginViewModel
    {

        [Required (ErrorMessage ="Email is Required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is Required")]

        [DataType (DataType.Password)]
        public string Password { get; set; }

        [Display(Name ="Remember me?")]
        public bool RememberMe { get; set; }
    }
}
