using Microsoft.AspNetCore.Mvc;

namespace LM.Frontend.App.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AppController : Controller
    {
        [ActionName("contacts")]
        [HttpGet]
        public string GetContacts()
        {
            return "{\"contacts\": \"roof.si.on.fire.science@gmail.com\"}";
        }
        
        [ActionName("author")]
        [HttpGet]
        public string GetAuthor()
        {
            return "{\"author\": \"Martynov Stanislav Vladimirovich\"}";
        }
        
        [ActionName("name")]
        [HttpGet]
        public string GetNaem()
        {
            return "{\"name\": \"[LM] Learn Math\"}";
        }
        
        [ActionName("version")]
        [HttpGet]
        public string GetVersion()
        {
            return "{\"version\": \"1.0.0\"}";
        }
    }
}