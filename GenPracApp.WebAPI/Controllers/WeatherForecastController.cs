using System.ComponentModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace GenPracApp.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries =
        [
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        ];

        [Authorize]
        [RequiredScope("Weatherforecast.Read")]
        [EndpointSummary("Get Weather Forecasts")]
        [EndpointDescription("Retrieves a list of weather forecasts for the next 5 days.")]
        [HttpGet]
        public IEnumerable<WeatherForecast> Get(
                [Description("The number of days to forecast")] int days = 5
            )
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [AllowAnonymous]
        [HttpGet("test-auth")]
        public string TestAuth()
        {
            return "Hello, World!";
        }
    }
}
