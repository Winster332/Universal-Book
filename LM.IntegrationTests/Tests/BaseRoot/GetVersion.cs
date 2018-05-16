using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using LM.IntegrationTests.Extensions;
using Xunit;
using Xunit.Abstractions;

namespace LM.IntegrationTests.Tests.BaseRoot
{
    [Collection("LM Test Harness")]
    public class GetVersion : LMTest
    {
        public GetVersion(LMHarness fixture) : base(fixture)
        {
        }

        [Fact]
        public async Task GetVersion_CheckVersionService_ReturnValidVersion()
        {
            var version = await Api.GetVersion();
            version.EnsureSuccessStatusCode();
            
            var json = await version.Content.GetJsonObject();
            
            json.Should().ContainsJson(@"
            {
                version: '1.0.0'
            }");
        }
    }
}