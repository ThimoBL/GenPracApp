using GenPracApp.Domain.Entities;

namespace GenPracApp.Tests.Domain;

public class WeatherForecastTests
{
    [Theory]
    [InlineData(0, 32)]
    [InlineData(100, 212)]
    [InlineData(-40, -40)]
    [InlineData(25, 77)]
    [InlineData(-20, 4)]
    public void TemperatureF_ReturnsExpectedConversion(int tempC, int expectedF)
    {
        var forecast = new WeatherForecast { TemperatureC = tempC };

        var expected = 32 + (int)(tempC / 0.5556);

        Assert.Equal(expected, forecast.TemperatureF);
    }
}
