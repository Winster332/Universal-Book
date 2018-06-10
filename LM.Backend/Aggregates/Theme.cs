using System;
using System.Collections.Generic;

namespace LM.Backend.Aggregates
{
    public class Theme : DbObject
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public Guid PartId { get; set; }
        public string Achievement { get; set; }
        public string Task { get; set; }
    }
}