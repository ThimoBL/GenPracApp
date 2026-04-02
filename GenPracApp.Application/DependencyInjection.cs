using GenPracApp.Application.Interfaces;
using GenPracApp.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace GenPracApp.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IWeatherForecastService, WeatherForecastService>();
        return services;
    }
}
