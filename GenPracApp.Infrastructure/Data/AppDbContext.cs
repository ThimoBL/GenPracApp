using GenPracApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GenPracApp.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<WeatherForecast> WeatherForecasts => Set<WeatherForecast>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<WeatherForecast>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Date).IsRequired();
            entity.Property(e => e.Summary).HasMaxLength(200);
            entity.Ignore(e => e.TemperatureF);
        });

        // Seed data
        modelBuilder.Entity<WeatherForecast>().HasData(
            new WeatherForecast { Id = 1, Date = new DateOnly(2026, 4, 1), TemperatureC = 20, Summary = "Mild" },
            new WeatherForecast { Id = 2, Date = new DateOnly(2026, 4, 2), TemperatureC = 25, Summary = "Warm" },
            new WeatherForecast { Id = 3, Date = new DateOnly(2026, 4, 3), TemperatureC = 15, Summary = "Cool" },
            new WeatherForecast { Id = 4, Date = new DateOnly(2026, 4, 4), TemperatureC = 30, Summary = "Hot" },
            new WeatherForecast { Id = 5, Date = new DateOnly(2026, 4, 5), TemperatureC = 10, Summary = "Chilly" }
        );
    }
}
