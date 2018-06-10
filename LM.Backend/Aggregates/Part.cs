using System;
using System.Collections.Generic;

namespace LM.Backend.Aggregates
{
    public class Part : DbObject
    {
        public string Name { get; set; }
        public List<Guid> Themes { get; set; }
        public string Achievement { get; set; }
    }
}