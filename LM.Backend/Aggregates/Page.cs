using System;
using System.Collections.Generic;

namespace LM.Backend.Aggregates
{
    public class Page : DbObject
    {
        public int Number { get; set; }
        public Guid ParentId { get; set; }
        public List<Guid> Contents { get; set; }
    }
}