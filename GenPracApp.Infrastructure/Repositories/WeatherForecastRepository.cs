using GenPracApp.Domain.Entities;
using GenPracApp.Domain.Interfaces;
using GenPracApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GenPracApp.Infrastructure.Repositories;

public class WeatherForecastRepository : IWeatherForecastRepository
{
    private readonly AppDbContext _context;

    public WeatherForecastRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<WeatherForecast>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.WeatherForecasts.ToListAsync(cancellationToken);
    }

    public async Task<WeatherForecast?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.WeatherForecasts.FindAsync([id], cancellationToken);
    }

    public async Task AddAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        await _context.WeatherForecasts.AddAsync(forecast, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
