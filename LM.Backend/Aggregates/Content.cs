using System;

namespace LM.Backend.Aggregates
{
    public class Content : DbObject
    {
        public Guid ParentId { get; set; }
        public TypeContent Type { get; set; }
        public string Value { get; set; }
    }
}