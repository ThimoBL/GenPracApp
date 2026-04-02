using GenPracApp.Application.Services;
using GenPracApp.Domain.Entities;
using GenPracApp.Domain.Interfaces;
using Moq;

namespace GenPracApp.Tests.Application;

public class WeatherForecastServiceTests
{
    private readonly Mock<IWeatherForecastRepository> _mockRepo;
    private readonly WeatherForecastService _service;

    public WeatherForecastServiceTests()
    {
        _mockRepo = new Mock<IWeatherForecastRepository>();
        _service = new WeatherForecastService(_mockRepo.Object);
    }

    [Fact]
    public async Task GetForecastsAsync_ReturnsForecastsFromRepository()
    {
        var forecasts = new List<WeatherForecast>
        {
            new() { Id = 1, Date = new DateOnly(2026, 4, 1), TemperatureC = 20, Summary = "Mild" },
            new() { Id = 2, Date = new DateOnly(2026, 4, 2), TemperatureC = 25, Summary = "Warm" }
        };
        _mockRepo.Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(forecasts);

        var result = await _service.GetForecastsAsync();

        Assert.Equal(forecasts, result);
        _mockRepo.Verify(r => r.GetAllAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task GetForecastsAsync_WhenRepositoryReturnsEmpty_ReturnsEmpty()
    {
        _mockRepo.Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<WeatherForecast>());

        var result = await _service.GetForecastsAsync();

        Assert.Empty(result);
    }

    [Fact]
    public async Task GetForecastByIdAsync_WhenExists_ReturnsForecast()
    {
        var forecast = new WeatherForecast { Id = 1, Date = new DateOnly(2026, 4, 1), TemperatureC = 20, Summary = "Mild" };
        _mockRepo.Setup(r => r.GetByIdAsync(1, It.IsAny<CancellationToken>()))
            .ReturnsAsync(forecast);

        var result = await _service.GetForecastByIdAsync(1);

        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal("Mild", result.Summary);
    }

    [Fact]
    public async Task GetForecastByIdAsync_WhenNotExists_ReturnsNull()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(999, It.IsAny<CancellationToken>()))
            .ReturnsAsync((WeatherForecast?)null);

        var result = await _service.GetForecastByIdAsync(999);

        Assert.Null(result);
    }
}
