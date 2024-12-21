using System.ComponentModel.DataAnnotations;
namespace Forms_MVP.ViewModel
{
    public class ChangePasswordModel
    {
        [Required(ErrorMessage = "Email is Required")]
        [EmailAddress]

        public  string Email { get; set; }

        [Required(ErrorMessage = "Email is Required")]
        [DataType(DataType.Password)]
        [StringLength(40, MinimumLength = 8, ErrorMessage = "Password should be 8 Characters")]
        [Compare("ConfirmedNewPassword", ErrorMessage = "Password Not Matched")]
        
        [Display(Name = "Confirm Password")]
       
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is Required")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm New Password")]
        public string ConfirmedNewPassword { get; set; }
    }
}

