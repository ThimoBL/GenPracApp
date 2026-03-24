using Azure.Identity;
using Azure.Monitor.OpenTelemetry.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration.AzureAppConfiguration;
using Microsoft.Identity.Web;

namespace GenPracApp.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var appConfigEndpoint = builder.Configuration.GetValue<string>("ENDPOINTS_APPCONFIGURATION")
                ?? throw new InvalidOperationException("The setting `ENDPOINTS_APPCONFIGURATION` was not found.");

            var azCredentials = new DefaultAzureCredential(
                new DefaultAzureCredentialOptions {
                    TenantId = "7f934ed0-4f65-44e2-8232-c4ab96384e6c",

                    AdditionallyAllowedTenants = { "*" }
                }
            );

            if (!string.IsNullOrEmpty(appConfigEndpoint))
            {

                builder.Configuration.AddAzureAppConfiguration(options =>
                {
                    options.Connect(new Uri(appConfigEndpoint), azCredentials)
                    .Select("WebAPI:*", builder.Environment.EnvironmentName)
                    .ConfigureRefresh(refreshOptions =>
                    {
                        refreshOptions.RegisterAll();
                    });
                });
            }

            var corsOrigin = builder.Configuration
                .GetValue<string>("WebAPI:CORS:AllowedOrigins");

            builder.Services.AddSwaggerGen();
            builder.Services.AddOpenTelemetry().UseAzureMonitor();

            // Add Azure App Configuration to the container
            builder.Services.AddAzureAppConfiguration();

            // Add authentication with Microsoft Identity platform
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

            // Add CORS to allow React SPA to call the API
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins(corsOrigin) // Your React app URL
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

            // Use Azure App Configuration middleware for dynamic configuration refresh
            app.UseAzureAppConfiguration();

            app.UseHttpsRedirection();

            app.UseCors("AllowReactApp");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
