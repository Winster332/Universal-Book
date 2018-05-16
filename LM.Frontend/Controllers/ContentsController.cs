using LM.Backend.Aggregates;
using LM.Backend.Storage;
using Microsoft.AspNetCore.Mvc;

namespace LM.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class ContentsController : MongoDbController<Content>
    {
        public ContentsController() : base(TypeCollection.Contents)
        {
        }
    }
}