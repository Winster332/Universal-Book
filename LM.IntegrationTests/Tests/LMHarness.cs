using System;
using System.Net.Http;
using LM.Backend.Storage;
using LM.WebApi;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.TestHost;
using MongoDB.Driver;
using Microsoft.Extensions.DependencyInjection;

namespace LM.IntegrationTests.Tests
{
    public class LMHarness : IDisposable
    {
        protected IServiceProvider _serviceProvider;
        private TestServer _server;
        private string MongoDatabaseName { get { return $"lm_test"; } }
        public IMongoDatabase MongoDb { get { return _serviceProvider.GetService<IMongoDatabase>(); } }
        public HttpClient Client { get; private set; }

        public LMHarness()
        {
            var services = new ServiceCollection();
            services.AddSingleton(new MongoClient(Environment.ExpandEnvironmentVariables("%OSDR_MONGO_DB%")));
            services.AddScoped(service => service.GetService<MongoClient>().GetDatabase(MongoDatabaseName));
            
            _serviceProvider = services.BuildServiceProvider();
            
            _server = new TestServer(new WebHostBuilder()
                .ConfigureServices(s =>
                {
                    s.AddSingleton(_serviceProvider.GetService<IMongoDatabase>());
                })
                .UseEnvironment("IntegrationTest")
                .UseStartup<Startup>());
            
            Client = _server.CreateClient();
        }
        
        public virtual void Dispose()
        {
            Repository.Instance.DropDatabase().GetAwaiter().GetResult();
        }
    }
}