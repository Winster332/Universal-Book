using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using LM.Backend.Aggregates;
using LM.Backend.Storage;
using LM.IntegrationTests.Extensions;
using Xunit;

namespace LM.IntegrationTests.Tests.Themes
{
    [Collection("LM Test Harness")]
    public class AddPage : LMTest
    {
        public Guid ThemeId { get; set; }
        public TypeCollection CurrentTypeCollection { get; set; } = TypeCollection.Themes;

        public AddPage(LMHarness fixture) : base(fixture)
        {
            ThemeId = Guid.NewGuid();
            
            Api.Create(CurrentTypeCollection, new Theme
            {
                Id = ThemeId,
                Pages = new List<Guid>(),
                Name = "My life"
            }).GetAwaiter().GetResult();
        }

        [Fact]
        public async Task TestBook_GetAddPart_ReturnPart()
        {
            var page = new Page
            {
                Number = 321
            };

            await Api.AddPageToTheme(ThemeId, page);

            var response = await Api.GetPagesFromTheme(ThemeId);
            var parts = await response.Content.GetJsonObject();
            var partFromBook = parts.First();
            
            partFromBook["Number"].ToObject<int>().ShouldBeEquivalentTo(321);
        }
    }
}