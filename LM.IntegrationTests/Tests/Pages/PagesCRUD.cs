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

namespace LM.IntegrationTests.Tests.Themes
{
    [Collection("LM Test Harness")]
    public class PagesCRUD : LMTest
    {
        public List<Guid> ListElements { get; set; }
        public TypeCollection CurrentTypeCollection { get; set; } = TypeCollection.Pages;

        public PagesCRUD(LMHarness fixture) : base(fixture)
        {
            ListElements = new List<Guid>()
            {
                Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid()
            };

            int i = 0;
            ListElements.ForEach(id =>
            {
                i++;
                Api.Create(CurrentTypeCollection, new Page
                {
                    Id = id,
                    Number = i,
                    Contents = new List<Guid>()
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
                Number: 2,
                Contents: *EXIST*
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
            var book = JsonConvert.DeserializeObject<List<Page>>(strJson).First();
            book.Number = 32;
            
            var response = await Api.Update(CurrentTypeCollection, book);
            response.EnsureSuccessStatusCode();

            var responseGet = await Api.Get(CurrentTypeCollection, bookId);
            var newBooks = await responseGet.Content.GetJsonObject();
            var newBook = newBooks.First();
            newBook.Should().ContainsJson($@"
            {{
                _id: '{bookId}',
                Number: 32
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