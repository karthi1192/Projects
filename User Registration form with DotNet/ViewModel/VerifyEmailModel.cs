using System.ComponentModel.DataAnnotations;

namespace Forms_MVP.ViewModel

{
    public class VerifyEmailModel
    {

        [Required (ErrorMessage ="Email is Required")]
        [EmailAddress]

        public string Email { get; set; }
    }
}
