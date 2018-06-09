using LM.Backend.Aggregates;
using LM.Backend.Storage;
using Microsoft.AspNetCore.Mvc;

namespace LM.Frontend.App.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UserController : MongoDbController<User>
    {
        public UserController() : base(TypeCollection.User) {}
    }
}