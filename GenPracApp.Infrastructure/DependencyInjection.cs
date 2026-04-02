using GenPracApp.Domain.Interfaces;
using GenPracApp.Infrastructure.Data;
using GenPracApp.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GenPracApp.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? "Data Source=GenPracApp.db";

        // To swap to Azure SQL later, change UseSqlite to UseSqlServer
        // and update the connection string in appsettings or Azure App Configuration.
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(connectionString));

        services.AddScoped<IWeatherForecastRepository, WeatherForecastRepository>();

        return services;
    }
}
