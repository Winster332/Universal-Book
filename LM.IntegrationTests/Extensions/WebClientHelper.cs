using System.Net.Http;
using System.Threading.Tasks;

namespace LM.IntegrationTests.Extensions
{
    public class WebClientHelper
    {
        private HttpClient client;

        public WebClientHelper(HttpClient client)
        {
            this.client = client;
        }

        public async Task<HttpResponseMessage> GetData(string url, string contentType = "application/json")
        {
            var request = new HttpRequestMessage(new HttpMethod("GET"), url)
            {
            };
            request.Content = new StringContent("");

            request.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(contentType);

            var response = await client.SendAsync(request);

            return  response;
        }
        public async Task<HttpResponseMessage> PatchData(string url, string stringContent)
        {
            var content = new StringContent(stringContent);

            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

            var request = new HttpRequestMessage(new HttpMethod("PATCH"), url)
            {
                Content = content
            };

            HttpResponseMessage response = new HttpResponseMessage();

            response = await client.SendAsync(request);

            return response;
        }
		
        public async Task<HttpResponseMessage> PostData(string url, string data)
        {
            var httpContent = new StringContent(data);
            httpContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");
            var response = await client.PostAsync(url, httpContent);
            response.EnsureSuccessStatusCode();

            return  response;
        }
    }
}