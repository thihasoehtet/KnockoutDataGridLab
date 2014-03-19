(function ($, window) {
    ko.bindingHandlers.sGrid = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            $(element).append('<thead data-bind="template: { name: \'' + value.theadTemplate + '\', data: {} }"></thead>');
            $(element).append('<tbody data-bind="template: { name: \'' + value.tbodyTemplate + '\', foreach: data }"></tbody>');
        }
    };

    function Person(data) {
        this.ID = ko.observable(data.ID);
        this.Company = ko.observable(data.Company);
        this.Name = ko.observable(data.Name);
    };
    var viewModel = {
        data: ko.observableArray([
            new Person({ ID: "ANATR", Company: "Ana Trujillo Emparedados y helados", Name: "Ana Trujillo" }),
            new Person({ ID: "ANTON", Company: "Antonio Moreno Taqueria", Name: "Antonio Moreno" }),
            new Person({ ID: "AROUT", Company: "Around the Horn", Name: "Thomas Hardy" }),
            new Person({ ID: "BERGS", Company: "Berglunds snabbkop", Name: "Christina Berglund" })
        ])
    };
    ko.applyBindings(viewModel);
})(jQuery, window);