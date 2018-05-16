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
    public class PartsController : MongoDbController<Part>
    {
        public PartsController() : base(TypeCollection.Parts)
        {
        }
        
        [HttpPost("addTheme/{id}")]
        public async Task<IActionResult> AddPart(Guid id, [FromBody]Theme document)
        {
            var parts = await Repository.Instance.Get(Type, id);
            var part = parts.First();

            if (document.Id == Guid.Empty)
                document.Id = Guid.NewGuid();
            
            document.ParentId = part._id;
            await Repository.Instance.Create(TypeCollection.Themes, document.ToBsonDocument());

            part.Themes.Add(document.Id);
            await Repository.Instance.Update(Type, BsonDocument.Create(part));

            return Ok();
        }

        [HttpGet("{id}/themes")]
        public async Task<IActionResult> GetParts(Guid id)
        {
            var parts = await Repository.Instance.Get(TypeCollection.Parts, id);
            var part = parts.First();

            var themes = await Repository.Instance.Get(TypeCollection.Themes);
            var results = themes.Where(x => x.ParentId == part._id);

            return Ok(results);
        }
    }
}