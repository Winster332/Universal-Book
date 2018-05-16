using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using LM.Backend.Aggregates;
using LM.Backend.Storage;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace LM.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : MongoDbController<Book>
    {
        public BooksController() : base(TypeCollection.Books)
        {
        }
        
        [HttpPost("{id}/addPart")]
        public async Task<IActionResult> AddPart(Guid id, [FromBody]Part document)
        {
            var books = await Repository.Instance.Get(Type, id);

            if (books.Count == 0)
            {
                var bookId = Guid.NewGuid();
                
                await Repository.Instance.Create(Type, new Book
                {
                    Id = bookId,
                    Name = Guid.NewGuid().ToString(),
                    Parts = new List<Guid>()
                }.ToBsonDocument());
                
                books = await Repository.Instance.Get(Type, bookId);
            }
            
            var book = books.First();

            if (document.Id == Guid.Empty)
                document.Id = Guid.NewGuid();
            
            document.ParentId = book._id;
            await Repository.Instance.Create(TypeCollection.Parts, document.ToBsonDocument());

            book.Parts.Add(document.Id);
            await Repository.Instance.Update(Type, BsonDocument.Create(book));

            return Ok();
        }

        [HttpGet("{id}/parts")]
        public async Task<IActionResult> GetParts(Guid id)
        {
            var books = await Repository.Instance.Get(TypeCollection.Books, id);
            var book = books.First();

            var parts = await Repository.Instance.Get(TypeCollection.Parts);
            var results = parts.Where(x => x.ParentId == book._id);

            return Ok(results);
        }
    }
}