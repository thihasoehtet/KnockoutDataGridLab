using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataGridLab.Models
{
    public class Record
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string Office { get; set; }
        public int Age { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public decimal Salary { get; set; }        
    }
}