using LM.IntegrationTests.Extensions;
using MongoDB.Driver;
using Xunit;
using Xunit.Abstractions;

namespace LM.IntegrationTests.Tests
{
    [CollectionDefinition("LM Test Harness")]
    public class OsdrTestCollection : ICollectionFixture<LMHarness>
    {
    }
    
    public class LMTest
    {
        protected LMHarness Fixture { get; private set; }
        protected IMongoCollection<dynamic> Nodes { get { return Fixture.MongoDb.GetCollection<dynamic>("Nodes"); } }
        protected IMongoCollection<dynamic> Files { get { return Fixture.MongoDb.GetCollection<dynamic>("Files"); } }
        public WebClientHelper Api { get; set; }
        
        public LMTest(LMHarness fixture)
        {
            Fixture = fixture;
            
            Api = new WebClientHelper(Fixture.Client);
        }
    }
}