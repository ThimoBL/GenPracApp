using GenPracApp.Domain.Entities;
using GenPracApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GenPracApp.Tests.Infrastructure;

public class AppDbContextTests
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
    public void WeatherForecast_HasCorrectPrimaryKey()
    {
        using var context = CreateContext();
        var entityType = context.Model.FindEntityType(typeof(WeatherForecast))!;
        var primaryKey = entityType.FindPrimaryKey()!;

        Assert.Single(primaryKey.Properties);
        Assert.Equal("Id", primaryKey.Properties[0].Name);
    }

    [Fact]
    public void WeatherForecast_TemperatureF_IsNotMapped()
    {
        using var context = CreateContext();
        var entityType = context.Model.FindEntityType(typeof(WeatherForecast))!;

        var property = entityType.FindProperty("TemperatureF");

        Assert.Null(property);
    }

    [Fact]
    public void WeatherForecast_Summary_HasMaxLength200()
    {
        using var context = CreateContext();
        var entityType = context.Model.FindEntityType(typeof(WeatherForecast))!;
        var summary = entityType.FindProperty("Summary")!;

        Assert.Equal(200, summary.GetMaxLength());
    }

    [Fact]
    public void SeedData_Contains5Records()
    {
        using var context = CreateContext();

        var forecasts = context.WeatherForecasts.ToList();

        Assert.Equal(5, forecasts.Count);
    }
}
