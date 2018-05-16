using System;
using System.Linq;
using System.Threading.Tasks;
using LM.Backend.Aggregates;
using LM.Backend.Storage;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace LM.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class PagesController : MongoDbController<Page>
    {
        public PagesController() : base(TypeCollection.Pages)
        {
        }
        
        [HttpPost("addContent/{id}")]
        public async Task<IActionResult> AddPart(Guid id, [FromBody]Content document)
        {
            var pages = await Repository.Instance.Get(Type, id);
            var page = pages.First();

            if (document.Id == Guid.Empty)
                document.Id = Guid.NewGuid();
            
            document.ParentId = page._id;
            await Repository.Instance.Create(TypeCollection.Contents, document.ToBsonDocument());

            page.Contents.Add(document.Id);
            await Repository.Instance.Update(Type, BsonDocument.Create(page));

            return Ok();
        }

        [HttpGet("{id}/contents")]
        public async Task<IActionResult> GetParts(Guid id)
        {
            var pages = await Repository.Instance.Get(TypeCollection.Pages, id);
            var page = pages.First();

            var contents = await Repository.Instance.Get(TypeCollection.Contents);
            var results = contents.Where(x => x.ParentId == page._id);

            return Ok(results);
        }
    }
}