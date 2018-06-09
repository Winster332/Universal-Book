using System;
using System.Collections.Generic;

namespace LM.Backend.Aggregates
{
    public enum Role { Student = 0, Admin = 1 }
    
    public class User : DbObject
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public IList<Guid> PartsDone { get; set; }
        public IList<Guid> ThemeDone { get; set; }
    }
}