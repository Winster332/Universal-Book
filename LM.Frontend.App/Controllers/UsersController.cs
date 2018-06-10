using System.Threading.Tasks;
using LM.Backend.Aggregates;
using LM.Backend.Storage;
using Microsoft.AspNetCore.Mvc;

namespace LM.Frontend.App.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UsersController : MongoDbController<User>
    {
        public UsersController() : base(TypeCollection.User) {}
        
        [ActionName("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]User user)
        {
            var result = await Repository.Instance.Get(Type);

            bool isContent = false;
            foreach (var userFromDb in result)
            {
                if (userFromDb.Name.ToString() == user.Name.ToString() && user.Password.ToString() == userFromDb.Password.ToString())
                {
                    isContent = true;
                    user.Id = userFromDb._id;
                }
            }
            
            if (isContent)
            {
                return Ok(user);
            }

            return Ok(null);
        }
    }
}