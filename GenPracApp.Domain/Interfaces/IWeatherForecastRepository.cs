using GenPracApp.Domain.Entities;

namespace GenPracApp.Domain.Interfaces;

public interface IWeatherForecastRepository
{
    Task<IEnumerable<WeatherForecast>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<WeatherForecast?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task AddAsync(WeatherForecast forecast, CancellationToken cancellationToken = default);
}
