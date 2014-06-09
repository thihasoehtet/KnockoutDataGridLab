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
            var data = GetRecords().ToArray();

            return View(data);
        }

        private IEnumerable<Record> GetRecords()
        {
            yield return new Record() { Id = 1, Name = "Airi Satou", Position = "Accountant", Office = "Tokyo", Age = 33, StartDate = new DateTimeOffset(2008, 11, 28, 0, 0, 0, TimeSpan.Zero) };
            yield return new Record() { Id = 2, Name = "Bradley Greer", Position = "Software Engineer", Office = "London", Age = 41, StartDate = new DateTimeOffset(2012, 10, 13, 0, 0, 0, TimeSpan.Zero) };
        }
    }
}
