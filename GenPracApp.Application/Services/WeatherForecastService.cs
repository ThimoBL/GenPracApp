using GenPracApp.Application.Interfaces;
using GenPracApp.Domain.Entities;
using GenPracApp.Domain.Interfaces;

namespace GenPracApp.Application.Services;

public class WeatherForecastService : IWeatherForecastService
{
    private readonly IWeatherForecastRepository _repository;

    public WeatherForecastService(IWeatherForecastRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<WeatherForecast>> GetForecastsAsync(CancellationToken cancellationToken = default)
    {
        return await _repository.GetAllAsync(cancellationToken);
    }

    public async Task<WeatherForecast?> GetForecastByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _repository.GetByIdAsync(id, cancellationToken);
    }
}
