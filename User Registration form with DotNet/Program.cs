using Forms_MVP.Data;
using Forms_MVP.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<AppDbContext>(options=> options.UseSqlServer(builder.Configuration.GetConnectionString("default")));

builder.Services.AddIdentity<Users, IdentityRole>(optional =>
{
    optional.Password.RequireNonAlphanumeric = false;
    optional.Password.RequiredLength = 8;
    optional.Password.RequireUppercase = false;
    optional.Password.RequireLowercase = false;
    optional.User.RequireUniqueEmail = true;
    optional.SignIn.RequireConfirmedAccount = false;
    optional.SignIn.RequireConfirmedEmail = false;
    optional.SignIn.RequireConfirmedPhoneNumber = false;

})
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();


      
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
