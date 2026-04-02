using GenPracApp.Domain.Entities;
using GenPracApp.Infrastructure.Data;
using GenPracApp.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace GenPracApp.Tests.Infrastructure;

public class WeatherForecastRepositoryTests
{
    private static AppDbContext CreateContext(string? dbName = null)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(dbName ?? Guid.NewGuid().ToString())
            .Options;
        var context = new AppDbContext(options);
        context.Database.EnsureCreated();
        return context;
    }

    [Fact]
    public async Task GetAllAsync_ReturnsSeedData()
    {
        using var context = CreateContext();
        var repository = new WeatherForecastRepository(context);

        var result = (await repository.GetAllAsync()).ToList();

        Assert.Equal(5, result.Count);
    }

    [Fact]
    public async Task GetByIdAsync_WhenExists_ReturnsForecast()
    {
        using var context = CreateContext();
        var repository = new WeatherForecastRepository(context);

        var result = await repository.GetByIdAsync(1);

        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal("Mild", result.Summary);
    }

    [Fact]
    public async Task GetByIdAsync_WhenNotExists_ReturnsNull()
    {
        using var context = CreateContext();
        var repository = new WeatherForecastRepository(context);

        var result = await repository.GetByIdAsync(999);

        Assert.Null(result);
    }

    [Fact]
    public async Task AddAsync_PersistsNewForecast()
    {
        var dbName = Guid.NewGuid().ToString();
        using var context = CreateContext(dbName);
        var repository = new WeatherForecastRepository(context);

        var newForecast = new WeatherForecast
        {
            Date = new DateOnly(2026, 5, 1),
            TemperatureC = 22,
            Summary = "Pleasant"
        };

        await repository.AddAsync(newForecast);

        // Use a fresh context to verify persistence
        using var verifyContext = CreateContext(dbName);
        var all = await verifyContext.WeatherForecasts.ToListAsync();
        Assert.Equal(6, all.Count);

        var added = await verifyContext.WeatherForecasts.FirstOrDefaultAsync(f => f.Summary == "Pleasant");
        Assert.NotNull(added);
        Assert.Equal(22, added.TemperatureC);
    }
}
