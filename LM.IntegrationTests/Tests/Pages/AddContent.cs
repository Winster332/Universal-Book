using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using LM.Backend.Aggregates;
using LM.Backend.Storage;
using LM.IntegrationTests.Extensions;
using Xunit;

namespace LM.IntegrationTests.Tests.Pages
{
    [Collection("LM Test Harness")]
    public class AddContent : LMTest
    {
        public Guid PartId { get; set; }
        public TypeCollection CurrentTypeCollection { get; set; } = TypeCollection.Pages;

        public AddContent(LMHarness fixture) : base(fixture)
        {
            PartId = Guid.NewGuid();
            
            Api.Create(CurrentTypeCollection, new Page
            {
                Id = PartId,
                Contents = new List<Guid>(),
                Number = 1
            }).GetAwaiter().GetResult();
        }

        [Fact]
        public async Task TestBook_GetAddPart_ReturnPart()
        {
            var content = new Content
            {
                Type = TypeContent.Text,
                Value = "Hello"
            };

            await Api.AddContentToPage(PartId, content);

            var response = await Api.GetContentsFromPages(PartId);
            var parts = await response.Content.GetJsonObject();
            var partFromBook = parts.First();
            
            partFromBook["Value"].ToObject<string>().Should().BeEquivalentTo("Hello");
        }
    }
}