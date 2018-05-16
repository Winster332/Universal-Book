using PeterKottas.DotNetCore.WindowsService;
using Serilog;

namespace LM.Startup.Frontend
{
    public class FrontendRunner
    {
        public FrontendRunner()
        {
            ServiceRunner<FrontendService>.Run(config =>
            {
                config.SetName(FrontendService.Name);
                config.SetDisplayName(FrontendService.Title);
                config.SetDescription(FrontendService.Description);

                var name = config.GetDefaultName();

                config.Service(serviceConfig =>
                {
                    serviceConfig.ServiceFactory((extraArguments, controller) =>
                    {
                        return new FrontendService();
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