using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LM.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class BaseController : Controller
    {
        [Route("api/version")]
        [HttpGet]
        public async Task<string> GetVersion()
        {
            return "{ version: '1.0.0' }";
        }
    }
}