using GenPracApp.Application.Interfaces;
using GenPracApp.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace GenPracApp.WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly IWeatherForecastService _service;

    public WeatherForecastController(IWeatherForecastService service)
    {
        _service = service;
    }

    [Authorize]
    [RequiredScope("Weatherforecast.Read")]
    [EndpointSummary("Get Weather Forecasts")]
    [EndpointDescription("Retrieves a list of weather forecasts.")]
    [HttpGet]
    public async Task<IEnumerable<WeatherForecast>> Get()
    {
        return await _service.GetForecastsAsync();
    }

    [AllowAnonymous]
    [HttpGet("test-auth")]
    public string TestAuth()
    {
        return "Hello, World!";
    }
}
