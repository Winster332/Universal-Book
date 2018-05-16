using System;
using PeterKottas.DotNetCore.WindowsService.Base;
using PeterKottas.DotNetCore.WindowsService.Interfaces;
using Serilog;

namespace LM.Startup.Backend
{
    public class BackendService : MicroService, IMicroService
    {
        public static string Name { get; set; } = "LearnMath - Backend";
        public static string Title { get; set; } = "LearnMath.Backend";
        public static string Description { get; set; } = "LearnMath.Backend - for build and run LM.Backend services";
        public static string Version { get; set; } = "1.0.0";
        
        public void Start()
        {
            StartBase();
            
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateLogger();
            
            Log.Information($"Service {Name} v.{Version} starting...");

            Log.Information($"Name: {Name}");
            Log.Information($"Title: {Title}");
            Log.Information($"Description: {Description}");
            Log.Information($"Version: {Version}");

            WebApi.Program.Main(new string[] {});
            
            Log.Information($"Service {Name} v.{Version} started");
        }

        public void Stop()
        {
            StopBase();
        }
    }
}