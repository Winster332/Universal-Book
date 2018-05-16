using System;
using System.Collections.Generic;

namespace LM.Backend.Aggregates
{
    public class Part : DbObject
    {
        public string Name { get; set; }
        public Guid ParentId { get; set; }
        public List<Guid> Themes { get; set; }
    }
}