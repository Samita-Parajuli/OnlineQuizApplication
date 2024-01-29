using Microsoft.EntityFrameworkCore;
using QuizApp.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<QuizContext>(opt => opt.UseInMemoryDatabase("QuizDb"));

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS so that frontend can access resources from backend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            // This allows any origin for simplicity, but you should restrict it in production
            builder.WithOrigins("*")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(); // Add this line to enable CORS

app.UseRouting();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
