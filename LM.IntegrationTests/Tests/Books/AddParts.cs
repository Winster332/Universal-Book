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
    public class AddParts : LMTest
    {
        public Guid BookId { get; set; }
        public TypeCollection CurrentTypeCollection { get; set; } = TypeCollection.Books;

        public AddParts(LMHarness fixture) : base(fixture)
        {
            BookId = Guid.NewGuid();
            
            Api.Create(CurrentTypeCollection, new Book
            {
                Id = BookId,
                Parts = new List<Guid>(),
                Name = "My life"
            }).GetAwaiter().GetResult();
        }

        [Fact]
        public async Task TestBook_GetAddPart_ReturnPart()
        {
            var part = new Part
            {
                Name = "Stas"
            };

            await Api.AddPartToBook(BookId, part);

            var response = await Api.GetPartsFromBook(BookId);
            var parts = await response.Content.GetJsonObject();
            var partFromBook = parts.First();
            
            partFromBook["Name"].ToObject<string>().Should().BeEquivalentTo("Stas");
        }
    }
}