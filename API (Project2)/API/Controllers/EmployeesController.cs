using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Authorize]

[ApiController]

[Route("api/[controller]")]

public class EmployeesController : ControllerBase

{

    private readonly EmployeeService _employeeService;

    public EmployeesController(EmployeeService employeeService)

    {

        _employeeService = employeeService;

    }


    [HttpGet("fetch")]

    public async Task<IActionResult> FetchEmployees([FromHeader(Name = "Authorization")] string token)

    {

        if (string.IsNullOrEmpty(token) || !token.StartsWith("Bearer "))

        {

            return Unauthorized("Token is missing or invalid.");

        }

        var jwtToken = token.Substring(7); 


        var employees = await _employeeService.GetEmployeesAsync(jwtToken);

       
        if (employees == null || !employees.Any())
        
        {
        
            return NotFound("No employees found from the external API.");
        }

        return Ok(employees);
    }


}


