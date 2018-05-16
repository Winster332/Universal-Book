using System;
using System.Net.Http;
using System.Threading.Tasks;
using LM.Backend.Aggregates;
using LM.Backend.Storage;
using Newtonsoft.Json.Linq;

namespace LM.IntegrationTests.Extensions
{
    public static class ExtensionsWebClient
    {
        public static async Task<JToken> GetJsonObject(this HttpContent content)
        {
            var stringJson = await content.ReadAsStringAsync();
            return JToken.Parse(stringJson);
        }
        
        public static async Task<HttpResponseMessage> GetVersion(this WebClientHelper client)
        {
            return await client.GetData("api/version");
        }
        
        public static async Task<HttpResponseMessage> Get(this WebClientHelper client, TypeCollection type, Guid? id = null)
        {
            if (id == null)
                return await client.GetData(GetUri(type));
            else return await client.GetData($"{GetUri(type)}/{id}");
        }
        
        public static async Task<HttpResponseMessage> Update(this WebClientHelper client, TypeCollection type, DbObject dbObject)
        {
            return await client.PostData($"{GetUri(type)}/update", dbObject.ToJsonString());
        }
        
        public static async Task<HttpResponseMessage> Create(this WebClientHelper client, TypeCollection type, DbObject dbObject)
        {
            var bodyBook = dbObject.ToJsonString();
            
            return await client.PostData($"{GetUri(type)}/create", bodyBook);
        }
        
        public static async Task<HttpResponseMessage> Delete(this WebClientHelper client, TypeCollection type, Guid id)
        {
            return await client.GetData($"{GetUri(type)}/remove/{id}");
        }
        
        public static async Task<HttpResponseMessage> AddPartToBook(this WebClientHelper client, Guid id, DbObject document)
        {
            var bodyBook = document.ToJsonString();
            
            return await client.PostData($"{GetUri(TypeCollection.Books)}/addPart/{id}", bodyBook);
        }
        
        public static async Task<HttpResponseMessage> GetPartsFromBook(this WebClientHelper client, Guid idBook)
        {
            return await client.GetData($"{GetUri(TypeCollection.Books)}/{idBook}/parts");
        }
        
        public static async Task<HttpResponseMessage> AddThemeToPart(this WebClientHelper client, Guid id, DbObject document)
        {
            var bodyTheme = document.ToJsonString();
            
            return await client.PostData($"{GetUri(TypeCollection.Parts)}/addTheme/{id}", bodyTheme);
        }
        
        public static async Task<HttpResponseMessage> GetThemesFromParts(this WebClientHelper client, Guid idPart)
        {
            return await client.GetData($"{GetUri(TypeCollection.Parts)}/{idPart}/themes");
        }
        
        public static async Task<HttpResponseMessage> AddPageToTheme(this WebClientHelper client, Guid id, DbObject document)
        {
            var bodyTheme = document.ToJsonString();
            
            return await client.PostData($"{GetUri(TypeCollection.Themes)}/addPage/{id}", bodyTheme);
        }
        
        public static async Task<HttpResponseMessage> GetPagesFromTheme(this WebClientHelper client, Guid idPart)
        {
            return await client.GetData($"{GetUri(TypeCollection.Themes)}/{idPart}/pages");
        }
        
        public static async Task<HttpResponseMessage> AddContentToPage(this WebClientHelper client, Guid id, DbObject document)
        {
            var bodyTheme = document.ToJsonString();
            
            return await client.PostData($"{GetUri(TypeCollection.Pages)}/addContent/{id}", bodyTheme);
        }
        
        public static async Task<HttpResponseMessage> GetContentsFromPages(this WebClientHelper client, Guid idContent)
        {
            return await client.GetData($"{GetUri(TypeCollection.Pages)}/{idContent}/contents");
        }

        private static string GetUri(TypeCollection type)
        {
            return $"api/{type}";
        }
    }
}