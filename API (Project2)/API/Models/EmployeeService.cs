using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Models;
using Newtonsoft.Json;

public class EmployeeService
{
    private readonly HttpClient _httpClient;

    public EmployeeService(HttpClient httpClient)

    {

        _httpClient = httpClient;

    }

    public async Task<List<Emp>> GetEmployeesAsync(string token)

    {

        var apiUrl = "api/Employees/GetAllEmployees"; 

        
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await _httpClient.GetAsync(apiUrl);

        if (response.IsSuccessStatusCode)

        {
            var responseData = await response.Content.ReadAsStringAsync();

          
            var employees = JsonConvert.DeserializeObject<List<Emp>>(responseData);

            return employees ?? new List<Emp>(); 
        }

        
        return null;
    }


}
