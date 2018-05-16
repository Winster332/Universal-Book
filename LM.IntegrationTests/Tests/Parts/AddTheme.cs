using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using LM.Backend.Aggregates;
using LM.Backend.Storage;
using LM.IntegrationTests.Extensions;
using Xunit;

namespace LM.IntegrationTests.Tests.Books
{
    [Collection("LM Test Harness")]
    public class AddTheme : LMTest
    {
        public Guid PartId { get; set; }
        public TypeCollection CurrentTypeCollection { get; set; } = TypeCollection.Parts;

        public AddTheme(LMHarness fixture) : base(fixture)
        {
            PartId = Guid.NewGuid();
            
            Api.Create(CurrentTypeCollection, new Part
            {
                Id = PartId,
                Themes = new List<Guid>(),
                Name = "My life"
            }).GetAwaiter().GetResult();
        }

        [Fact]
        public async Task TestBook_GetAddPart_ReturnPart()
        {
            var theme = new Theme
            {
                Name = "Stas"
            };

            await Api.AddThemeToPart(PartId, theme);

            var response = await Api.GetThemesFromParts(PartId);
            var parts = await response.Content.GetJsonObject();
            var partFromBook = parts.First();
            
            partFromBook["Name"].ToObject<string>().Should().BeEquivalentTo("Stas");
        }
    }
}