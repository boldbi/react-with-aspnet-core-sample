using BoldBI.Embed.Sample.Model;
using BoldBI.Embed.Sample.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.IO;
using System;
using System.Reflection.PortableExecutable;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors(corsPolicyBuilder => corsPolicyBuilder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

app.UseHttpsRedirection();
app.UseStaticFiles();

//try
//{
//    string basePath = AppDomain.CurrentDomain.BaseDirectory;
//    string jsonString = File.ReadAllText(Path.Combine(basePath, "embedConfig.json"));
//    GlobalAppSettings.EmbedDetails = JsonConvert.DeserializeObject<EmbedDetails>(jsonString);
//}
//catch (Exception)
//{
//    app.UseExceptionHandler("/error");
//    app.Map("/error", errorApp =>
//    {
//        errorApp.Run(async context =>
//        {
//            //context.Response.StatusCode = 500;
//            //context.Response.ContentType = "text/html";
//            await context.Response.SendFileAsync("Views/Home/EmbedConfigErrorLog.cshtml");
//        });
//    });
//}

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
