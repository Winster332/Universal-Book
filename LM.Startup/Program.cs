using System;
using System.Threading.Tasks;
using LM.Startup.Backend;
using LM.Startup.Frontend;

namespace LM.Startup
{
    public class Program
    {
        public static BackendRunner Backend { get; set; }
        public static FrontendRunner Frontend { get; set; }
        
        private static void Main(string[] args)
        {
//            Task.Run(() => Backend = new BackendRunner());
//            Task.Run(() => Frontend = new FrontendRunner());
            Console.ReadKey();
        }
    }
}