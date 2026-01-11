using Azure.Monitor.OpenTelemetry.AspNetCore;
using Microsoft.Identity.Web;

namespace GenPracApp.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var corsOrigin = builder.Configuration
                .GetSection("Cors:AllowedOrigins")
                .Get<string[]>();

            builder.Services.AddSwaggerGen();
            builder.Services.AddOpenTelemetry().UseAzureMonitor();

            // Add authentication with Microsoft Identity platform
            builder.Services.AddAuthentication("Bearer")
                .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

            // Add CORS to allow React SPA to call the API
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins("https://gentle-mud-043be6803.3.azurestaticapps.net") // Your React app URL
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            // Add services to the container.

            builder.Services.AddControllers();

            var app = builder.Build();

            app.UseSwagger();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "api");
                });
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowReactApp");

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
