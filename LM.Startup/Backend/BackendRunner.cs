using LM.Backend;
using PeterKottas.DotNetCore.WindowsService;
using Serilog;

namespace LM.Startup.Backend
{
    public class BackendRunner
    {
        public BackendRunner()
        {
            ServiceRunner<BackendService>.Run(config =>
            {
                config.SetName(BackendService.Name);
                config.SetDisplayName(BackendService.Title);
                config.SetDescription(BackendService.Description);

                var name = config.GetDefaultName();

                config.Service(serviceConfig =>
                {
                    serviceConfig.ServiceFactory((extraArguments, controller) =>
                    {
                        return new BackendService();
                    });

                    serviceConfig.OnStart((service, extraParams) =>
                    {
                        service.Start();
                    });

                    serviceConfig.OnStop(service =>
                    {
                        service.Stop();
                    });

                    serviceConfig.OnError(e =>
                    {
                        Log.Error($"Service {name} errored with exception : {e.Message}");
                    });
                });
            });
        }
    }
}