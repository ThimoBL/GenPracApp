using GenPracApp.Domain.Entities;

namespace GenPracApp.Application.Interfaces;

public interface IWeatherForecastService
{
    Task<IEnumerable<WeatherForecast>> GetForecastsAsync(CancellationToken cancellationToken = default);
    Task<WeatherForecast?> GetForecastByIdAsync(int id, CancellationToken cancellationToken = default);
}
