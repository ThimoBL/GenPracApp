using GenPracApp.Application.Interfaces;
using GenPracApp.Domain.Entities;
using GenPracApp.WebAPI.Controllers;
using Moq;

namespace GenPracApp.Tests.WebAPI;

public class WeatherForecastControllerTests
{
    private readonly Mock<IWeatherForecastService> _mockService;
    private readonly WeatherForecastController _controller;

    public WeatherForecastControllerTests()
    {
        _mockService = new Mock<IWeatherForecastService>();
        _controller = new WeatherForecastController(_mockService.Object);
    }

    [Fact]
    public async Task Get_ReturnsForecasts()
    {
        var forecasts = new List<WeatherForecast>
        {
            new() { Id = 1, Date = new DateOnly(2026, 4, 1), TemperatureC = 20, Summary = "Mild" },
            new() { Id = 2, Date = new DateOnly(2026, 4, 2), TemperatureC = 25, Summary = "Warm" }
        };
        _mockService.Setup(s => s.GetForecastsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(forecasts);

        var result = await _controller.Get();

        Assert.Equal(forecasts, result);
        _mockService.Verify(s => s.GetForecastsAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Get_WhenNoForecasts_ReturnsEmpty()
    {
        _mockService.Setup(s => s.GetForecastsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<WeatherForecast>());

        var result = await _controller.Get();

        Assert.Empty(result);
    }

    [Fact]
    public void TestAuth_ReturnsHelloWorld()
    {
        var result = _controller.TestAuth();

        Assert.Equal("Hello, World!", result);
    }
}
