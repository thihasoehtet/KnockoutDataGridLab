using System.Web;
using System.Web.Optimization;

namespace DataGridLab
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterScripts(bundles);

            RegisterStyles(bundles);
        }

        private static void RegisterStyles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            bundles.Add(new StyleBundle("~/Content/wijmo/css").Include(
                        "~/Content/themes/aristo/jquery-wijmo.css",
                        "~/Content/jquery.wijmo-open.{version}.css",
                        "~/Content/jquery.wijmo-pro.{version}.css"));

            bundles.Add(new StyleBundle("~/Content/kogrid/css").Include(
                        "~/Content/KoGrid.css"));
        }

        private static void RegisterScripts(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                        "~/Scripts/knockout-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/wijmo").Include(
                        "~/Scripts/jquery.wijmo-open.all.{version}.js",
                        "~/Scripts/jquery.wijmo-pro.all.{version}.js",
                        "~/Scripts/knockout.wijmo.js"));

            bundles.Add(new ScriptBundle("~/bundles/wijmo/lab").Include(
                        "~/Scripts/WijmoGridLab/wijmoGridLab.js"));

            bundles.Add(new ScriptBundle("~/bundles/lab").Include(
                        "~/Scripts/Lab/knockout-table.js",
                        "~/Scripts/Lab/lab.js"));

            bundles.Add(new ScriptBundle("~/bundles/kogrid").Include(
                        "~/Scripts/koGrid-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/kogrid/lab").Include(
                        "~/Scripts/KoGridLab/koGridLab.js"));
        }
    }
}