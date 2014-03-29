(function ($, window) {
    ko.bindingHandlers.table = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            renderthead(element, value);
            rendertbody(element, value);
        }
    };

    var renderthead = function (element, value) {        
        var theadTag = '';
        if (value.theadTemplate) {
            var template = '';
            if (!value.headData) {
                template = '\'' + value.theadTemplate + '\'';
            } else {
                template = '{ name: \'' + value.theadTemplate + '\', data: ' + value.headData + ' }';
            }
            theadTag = '<thead data-bind="template: ' + template + '"></thead>';
            
        } else {
            var headerCols = '';
            for (var prop in value.bodyData) {
                headerCols += '<th>' + prop + '</th>';
            }
            theadTag = '<thead><tr>' + headerCols + '</tr></thead>';            
        }
        $(element).append(theadTag);
    };

    var rendertbody = function (element, value) {
        if (value.tbodyTemplate) {
            var template = '';
            if (!value.bodyData) {
                template = '\'' + value.tbodyTemplate + '\'';
            } else {
                template = '{ name: \'' + value.tbodyTemplate + '\', foreach: ' + value.bodyData + ' }';
            }
            var tbodyTag = '<tbody data-bind="template: ' + template + '"></tbody>';
            $(element).append(tbodyTag);
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