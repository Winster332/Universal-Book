using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace LM.Backend.Aggregates
{
    public class Book : DbObject
    {
        public string Name { get; set; }
        public List<Guid> Parts { get; set; }
    }
}