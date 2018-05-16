using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using LM.Backend.Aggregates;
using LM.Backend.Storage;
using LM.IntegrationTests.Extensions;
using Newtonsoft.Json;
using Xunit;

namespace LM.IntegrationTests.Tests.Parts
{
    [Collection("LM Test Harness")]
    public class PartsCRUD : LMTest
    {
        public List<Guid> ListElements { get; set; }
        public TypeCollection CurrentTypeCollection { get; set; } = TypeCollection.Parts;

        public PartsCRUD(LMHarness fixture) : base(fixture)
        {
            ListElements = new List<Guid>()
            {
                Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid()
            };

            ListElements.ForEach(id =>
            {
                Api.Create(CurrentTypeCollection, new Part
                {
                    Id = id,
                    Name = "Hello",
                    Themes = new List<Guid>()
                }).GetAwaiter().GetResult();
            });
        }

        [Fact]
        public async Task TestBook_GetConcretBook_ReturnOneBook()
        {
            var response = await Api.Get(CurrentTypeCollection, ListElements[1]);
            var books = await response.Content.GetJsonObject();
            var book = books.Single();

            book.Should().ContainsJson($@"
            {{
                _id: '{ListElements[1]}',
                Name: 'Hello',
                Themes: *EXIST*
            }}");
        }
        
        [Fact]
        public async Task TestBook_Get_ReturnAllBooks()
        {
            var response = await Api.Get(CurrentTypeCollection);
            var books = await response.Content.GetJsonObject();
            var booksId = books.Select(x => x["_id"].ToObject<Guid>());

            booksId.Should().HaveCount(4);
            ListElements.ForEach(localId => booksId.Contains(localId));
        }
        
        [Fact]
        public async Task TestBook_GetUpdate_ReturnUpdatedBook()
        {
            var bookId = ListElements[1];
            var responseBook = await Api.Get(CurrentTypeCollection, bookId);
            var strJson = await responseBook.Content.ReadAsStringAsync();
            strJson = strJson.Replace("_id", "Id");
            var book = JsonConvert.DeserializeObject<List<Part>>(strJson).First();
            book.Name = "New Hello";
            
            var response = await Api.Update(CurrentTypeCollection, book);
            response.EnsureSuccessStatusCode();

            var responseGet = await Api.Get(CurrentTypeCollection, bookId);
            var newBooks = await responseGet.Content.GetJsonObject();
            var newBook = newBooks.First();
            newBook.Should().ContainsJson($@"
            {{
                _id: '{bookId}',
                Name: 'New Hello'
            }}");
        }
        
        [Fact]
        public async Task TestBook_Delete_ReturnThreeElements()
        {
            var bookId = ListElements[1];
            var responseDelete = await Api.Delete(CurrentTypeCollection, bookId);
            responseDelete.EnsureSuccessStatusCode();
            
            var responseGet = await Api.Get(CurrentTypeCollection, bookId);
            var newBooks = await responseGet.Content.GetJsonObject();
            newBooks.Should().HaveCount(0);
        }
    }
}