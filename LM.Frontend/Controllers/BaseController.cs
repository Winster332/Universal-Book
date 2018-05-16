using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LM.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BaseController : Controller
    {
        [ActionName("version")]
        [HttpGet]
        public string GetVersion()
        {
            return "{\"version\": \"1.0.0\"}";
        }
    }
}