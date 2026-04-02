using GenPracApp.Application;
using GenPracApp.Application.Interfaces;
using GenPracApp.Application.Services;
using GenPracApp.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Moq;

namespace GenPracApp.Tests.Application;

public class DependencyInjectionTests
{
    [Fact]
    public void AddApplicationServices_RegistersWeatherForecastService()
    {
        var services = new ServiceCollection();
        services.AddScoped<IWeatherForecastRepository>(_ => Mock.Of<IWeatherForecastRepository>());

        services.AddApplicationServices();

        var descriptor = services.FirstOrDefault(d => d.ServiceType == typeof(IWeatherForecastService));
        Assert.NotNull(descriptor);
        Assert.Equal(ServiceLifetime.Scoped, descriptor.Lifetime);
        Assert.Equal(typeof(WeatherForecastService), descriptor.ImplementationType);
    }

    [Fact]
    public void AddApplicationServices_ServiceResolvesCorrectly()
    {
        var services = new ServiceCollection();
        services.AddScoped<IWeatherForecastRepository>(_ => Mock.Of<IWeatherForecastRepository>());

        services.AddApplicationServices();

        using var provider = services.BuildServiceProvider();
        var service = provider.GetService<IWeatherForecastService>();

        Assert.NotNull(service);
        Assert.IsType<WeatherForecastService>(service);
    }
}
