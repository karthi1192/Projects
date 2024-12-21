using Azure.Identity;
using Forms_MVP.Models;
using Forms_MVP.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Abstractions;


namespace Forms_MVP.Controllers
{
    public class AccountController : Controller
    {

        private readonly SignInManager<Users> signInManager;

        private readonly UserManager<Users> userManager;

        public AccountController(SignInManager<Users> signInManager, UserManager<Users> userManager)
        {
            this.signInManager = signInManager;

            this.userManager = userManager;

        }


        public IActionResult Login()
        {
            return View();
        }


        [HttpPost]

        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)

            {
                var result = await signInManager.PasswordSignInAsync(model.Email, model.Password,  model.RememberMe, false);

                if (result.Succeeded)
                {

                    return RedirectToAction("Index", "Home");
                }

                else
                {
                    ModelState.AddModelError("", "Email or Password is Incorrect");

                    return View(model);
                }

            }

            return View(model);

        }


        public IActionResult Register()
        {

            return View();
        }

        [HttpPost]

        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await userManager.FindByNameAsync(model.Email);

                if(existingUser !=null) 

                {
                    ModelState.AddModelError("", "This Email Already Registered");

                    return View(model);
                }

                Users users = new Users
                {

                    FullName = model.Name,
                    Email = model.Email,
                    UserName = model.Email,

                };

                var result = await userManager.CreateAsync(users, model.Password);

                if (result.Succeeded)
                {

                    return RedirectToAction("Login", "Account");
                }

                else
                {
                    foreach (var error in result.Errors)
                    {

                        ModelState.AddModelError("", error.Description);
                    }

                    return View(model);
                }

                
            }
            return View(model);
        }

        public async Task<IActionResult> VerifyEmail(VerifyEmailModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(model.Email);

                if (user == null)
                {
                    ModelState.AddModelError("", "Email Id not Available Please create New account");

                    return View(model);
                }

                else
                {
                    return RedirectToAction("ChangePassword", "Account", new { email = user.UserName });

                }
            }

            return View(model);
        }

        public IActionResult ChangePassword(string email)
        {
            if (string.IsNullOrEmpty(email))
            {

                return RedirectToAction("VerifyEmail", "Account");
            }

            return View(new ChangePasswordModel { Email = email});

        }   
         
        [HttpPost]

        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)


        {
            if (ModelState.IsValid) 
            {

                var user = await userManager.FindByEmailAsync(model.Email);
                    
                if (user != null)
                {

                    var result = await userManager.RemovePasswordAsync(user);

                    if (result.Succeeded)   
                    {

                        result = await userManager.AddPasswordAsync(user, model.Password);

                        return RedirectToAction("Login", "Account");

                    }

                    else
                    {

                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }

                        return View(model);
                    } 
                }

                else
                {
                    ModelState.AddModelError("", "Email not found!");

                    return View(model);

                }
            }
            else
            {
                ModelState.AddModelError("", "Something went Wrong!");

                return View(model);

            }
        }
    }
}

            


    
     
    

