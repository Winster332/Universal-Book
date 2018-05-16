using System;
using System.Collections.Generic;

namespace LM.Backend.Aggregates
{
    public class Theme : DbObject
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid ParentId { get; set; }
        public List<Guid> Pages { get; set; }
    }
}