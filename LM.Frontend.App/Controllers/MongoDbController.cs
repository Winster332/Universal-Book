using System;
using System.Threading.Tasks;
using LM.Backend.Storage;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace LM.Frontend.App.Controllers
{
    public class MongoDbController<T> : Controller
    {
        public TypeCollection Type { get; }

        public MongoDbController(TypeCollection type)
        {
            Type = type;
        }
        
        [ActionName("create")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]T document)
        {
            await Repository.Instance.Create(Type, document.ToBsonDocument());

            return Ok();
        }
        
        [ActionName("update")]
        [HttpPost]
        public async Task<IActionResult> Update([FromBody]T document)
        {
            await Repository.Instance.Update(Type, document.ToBsonDocument());

            return Ok();
        }
        
        [ActionName("remove/{id}")]
        [HttpGet]
        public async Task<IActionResult> Remove(Guid id)
        {
            await Repository.Instance.Remove(Type, id);

            return Ok();
        }
        
        [ActionName("")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await Repository.Instance.Get(Type);
            
            return Ok(result);
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await Repository.Instance.Get(Type, id);
            
            return Ok(result);
        }
    }
}