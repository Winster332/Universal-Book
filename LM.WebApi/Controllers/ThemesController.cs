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
    public class ThemesController : MongoDbController<Theme>
    {
        public ThemesController() : base(TypeCollection.Themes)
        {
        }
        
        [HttpPost("addPage/{id}")]
        public async Task<IActionResult> AddPart(Guid id, [FromBody]Page document)
        {
            var themes = await Repository.Instance.Get(Type, id);
            var theme = themes.First();

            if (document.Id == Guid.Empty)
                document.Id = Guid.NewGuid();
            
            document.ParentId = theme._id;
            await Repository.Instance.Create(TypeCollection.Pages, document.ToBsonDocument());

            theme.Pages.Add(document.Id);
            await Repository.Instance.Update(Type, BsonDocument.Create(theme));

            return Ok();
        }

        [HttpGet("{id}/pages")]
        public async Task<IActionResult> GetParts(Guid id)
        {
            var themes = await Repository.Instance.Get(TypeCollection.Themes, id);
            var theme = themes.First();

            var pages = await Repository.Instance.Get(TypeCollection.Pages);
            var results = pages.Where(x => x.ParentId == theme._id);

            return Ok(results);
        }
    }
}