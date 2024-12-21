using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// load config and sett

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);


var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();


Console.WriteLine($"Loaded JWT SecretKey: {jwtSettings.SecretKey}");

// JWT authentication

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

    .AddJwtBearer(options =>
    
    {
    
        options.TokenValidationParameters = new TokenValidationParameters
        
        {
            ValidateIssuer = true,
        
            ValidateAudience = true,
            
            ValidateIssuerSigningKey = true,
            
            ValidateLifetime = true,
            
            ValidIssuer = jwtSettings.Issuer,
            
            ValidAudience = jwtSettings.Audience,
            
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
        
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();



builder.Services.AddHttpClient<EmployeeService>(client =>

{

    client.BaseAddress = new Uri("http://localhost/API/"); // External API Base URL

});

var app = builder.Build();

// Swagger for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();


public class JwtSettings
{
    public string SecretKey { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int ExpiryMinutes { get; set; }
}