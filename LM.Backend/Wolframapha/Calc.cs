using System.Net.Http;

namespace LM.Backend.Wolframapha
{
    public class Calc
    {
        private HttpClient _client;
        private static Calc _instance;
        public static Calc Instance => _instance ?? (_instance = new Calc());

        private Calc()
        {
            _client = new HttpClient();
        }

        public void Calculation(string task)
        {
            
        }
    }
}