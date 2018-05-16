using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LM.Backend.Aggregates
{
    public class DbObject
    {
        public Guid Id { get; set; }

        public string ToJsonString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}