using System.ComponentModel.DataAnnotations;

namespace Forms_MVP.ViewModel
{
    public class RegisterViewModel
    {
        [Required (ErrorMessage = "Name is Required")]
        public string Name { get; set; }


        [Required(ErrorMessage = "Email is Required")]
        [DataType (DataType.EmailAddress)]
       
        public string Email { get; set; }

        [StringLength(40, MinimumLength = 8, ErrorMessage = "Password should be 8 Characters")]
        [Compare("ConfirmedPassword", ErrorMessage = "Password Not Matched")]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Password is Required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is Required")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        public string ConfirmedPassword { get; set; }

    }
}
