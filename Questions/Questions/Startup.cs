using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Questions.Context;
using Questions.Crud;
using Questions.Dtos;
using Questions.Infrastructure;
using Questions.Models;
using Questions.Services;
using System.Text;
namespace Questions;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(name: "AllowOrigin", builder =>
            {
                builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
            });
        });

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.AddControllers();
        services.AddScoped(typeof(IRepository<Question>), typeof(DatabaseRepository<Question>));
        services.AddScoped(typeof(IRepository<Answer>), typeof(DatabaseRepository<Answer>));
        services.AddScoped(typeof(IRepository<Exam>), typeof(DatabaseRepository<Exam>));
        services.AddDbContext<QuestionsContext>(options => options.UseSqlServer(Configuration.GetConnectionString("MyDBConnection")));
        services.AddScoped<IQuestionService, QuestionService>();
        services.AddScoped<IBaseService<AnswerDto>, AnswerService>();
        services.AddScoped<IExamService, ExamService>();
        services.AddOpenApiDocument(o => o.SchemaSettings.SchemaNameGenerator = new CustomSwaggerSchemaNameGenerator());
        services.AddMassTransit(busConfigurator =>
        {
            busConfigurator.SetKebabCaseEndpointNameFormatter();
            busConfigurator.UsingRabbitMq((context, configurator) =>
            {
                configurator.Host(new Uri(Configuration["MessageBroker:Host"]!), h =>
                {
                    h.Username(Configuration["MessageBroker:Username"]);
                    h.Password(Configuration["MessageBroker:Password"]);
                });
                configurator.ConfigureEndpoints(context);
            });
        });


        /*services.AddOpenIddict()
            .AddClient(o =>
            {
                o.AllowClientCredentialsFlow();
                o.UseAspNetCore()
                .EnableStatusCodePagesIntegration()
                .EnableRedirectionEndpointPassthrough()
                .EnablePostLogoutRedirectionEndpointPassthrough();

                o.UseSystemNetHttp();

                o.AddRegistration(new OpenIddict.Client.OpenIddictClientRegistration
                {
                    Issuer = new Uri("https://localhost:7206/", UriKind.Absolute),
                    ClientId = "service-worker",
                    ClientSecret = "AQAAAAEAACcQAAAAEOi6AEFnzUTwMIuTylHEMYWNB6eKKmmAvmTeVpORQ+iLGuHglOx3eV8lP5K4bVnBqA=="
                });

            })
        .AddValidation(options =>
        {
            options.SetIssuer("https://localhost:7206/");
            options.UseIntrospection()
                .SetClientId("service-worker")
                .SetClientSecret("AQAAAAEAACcQAAAAEOi6AEFnzUTwMIuTylHEMYWNB6eKKmmAvmTeVpORQ+iLGuHglOx3eV8lP5K4bVnBqA==");

            options.UseSystemNetHttp();

            options.UseAspNetCore();
        });*/
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
            options.Audience = "test123";
            options.Authority = "https://localhost:7206/";
            options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SigningKey"]!)),
                ValidIssuer = "https://localhost:7206/",
                ValidAudience = Configuration["Jwt:Audience"],

            };
            //options.Audience = "test123";
            //options.Authority = "https://localhost:7206/";
            //options.ClaimsIssuer = "https://localhost:7206/";
            //options.
        });
    }


    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();


        app.UseCors("AllowOrigin");

        app.UseAuthentication();

        app.UseRouting();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        app.UseOpenApi();
        app.UseSwaggerUi();
        app.UseReDoc();
    }
}