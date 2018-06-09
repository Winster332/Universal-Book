using System;
using System.Threading.Tasks;
using LM.Backend.Aggregates;
using LM.Backend.Storage;
using LM.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace LM.Frontend.Controllers
{
    public class UserController : MongoDbController<User>
    {
        public UserController() : base(TypeCollection.User)
        {
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await Repository.Instance.Get(Type, id);
            
            return Ok(result);
        }
    }
}