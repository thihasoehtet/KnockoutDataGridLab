using DataGridLab.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataGridLab.Controllers
{
    public class KnockoutController : Controller
    {
        //
        // GET: /Knockout/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ServerSide()
        {            
            return View();
        }

        [HttpPost]
        public JsonResult ServerSidePaging(KoTable koTable)
        {
            var q = GetRecords();

            if (!string.IsNullOrWhiteSpace(koTable.Payload.Name))
            {
                q = q.Where(d => d.Name.ToLower().Contains(koTable.Payload.Name.ToLower()));
            }                

            if (koTable.SortValue.Direction == "asc")
            {
                q = q.OrderBy(d => d.Age);
            }
            else
            {
                q = q.OrderByDescending(d => d.Age);
            }

            int recordsTotal = q.Count();
            var data = q.Skip(koTable.Start).Take(koTable.Length).ToList();

            return Json(new { data, recordsTotal });
        }

        private IEnumerable<Record> GetRecords()
        {
            yield return new Record() { Id = 1, Name = "Airi Satou", Position = "Accountant", Office = "Tokyo", Age = 33, StartDate = new DateTimeOffset(2008, 11, 28, 0, 0, 0, TimeSpan.Zero) };
            yield return new Record() { Id = 2, Name = "Bradley Greer", Position = "Software Engineer", Office = "London", Age = 41, StartDate = new DateTimeOffset(2012, 10, 13, 0, 0, 0, TimeSpan.Zero) };
            yield return new Record() { Id = 3, Name = "Ajj Bu", Position = "GM", Office = "London", Age = 50, StartDate = new DateTimeOffset(2012, 10, 13, 0, 0, 0, TimeSpan.Zero) };
        }
    }

    public class Payload
    {
        public string Name { get; set; }
    }

    public class SortValue
    {
        public string Key { get; set; }
        public string Direction { get; set; }
    }

    public class KoTable
    {
        public int Start { get; set; }
        public int Length { get; set; }
        public Payload Payload { get; set; }
        public SortValue SortValue { get; set; }
    }
}
