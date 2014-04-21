(function ($, window) {
    ko.bindingHandlers.table = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            if (!$(element).is('div')) return;
            buildTable(element, valueAccessor);
        }
    };

    var buildTable = function (element, valueAccessor) {
        var table = addTable(element);
        renderthead(table, valueAccessor);
        rendertbody(table, valueAccessor);
    };

    var addTable = function (element) {
        return $(element).append('<table></table>').get(0);
    }

    var renderthead = function (element, valueAccessor) {
        var value = valueAccessor();
        var theadTag = '';        
        if (value.theadTemplate) {
            var template = '';
            if (!value.headData) {
                template = '\'' + value.theadTemplate + '\'';
            }
            else {
                var sheadData = getPropDataAsString(valueAccessor, "headData");
                template = '{ name: \'' + value.theadTemplate + '\', data: ' + sheadData + ' }';
            }
            theadTag = '<thead data-bind="template: ' + template + '"></thead>';            
        }
        else {
            var headerCols = '';
            if (value.bodyData) {                
                for (var prop in value.bodyData()[0]) {
                    headerCols += '<th>' + prop + '</th>';
                }                
            }
            else {
                for (var prop in value()[0]) {
                    headerCols += '<th>' + prop + '</th>';
                }
            }
            theadTag = '<thead><tr>' + headerCols + '</tr></thead>';
        }
        $(element).append(theadTag);
    };

    var rendertbody = function (element, valueAccessor) {
        var value = valueAccessor();
        var tbodyTag = "";
        if (value.tbodyTemplate) {
            var template = '';
            if (!value.bodyData) {
                template = '\'' + value.tbodyTemplate + '\'';
            }
            else {
                var sBodyData = getPropDataAsString(valueAccessor, "bodyData");
                template = '{ name: \'' + value.tbodyTemplate + '\', foreach: ' + sBodyData + ' }';
            }
            tbodyTag = '<tbody data-bind="template: ' + template + '"></tbody>';            
        }
        else {
            if (value.bodyData) {
                var tds = ""
                for (var prop in value.bodyData()[0]) {
                    tds += '<td data-bind="text: ' + prop + '"></td>';
                }
                var sBodyData = getPropDataAsString(valueAccessor, "bodyData");
                tbodyTag = '<tbody data-bind="foreach: ' + sBodyData + '"><tr>' + tds + '</tr></tbody>';
            }
            else {
                var tds = ""
                for (var prop in value()[0]) {
                    tds += '<td data-bind="text: ' + prop + '"></td>';
                }
                var sBodyData = getReturnDataAsString(valueAccessor);
                tbodyTag = '<tbody data-bind="foreach: ' + sBodyData + '"><tr>' + tds + '</tr></tbody>';
            }
        }
        $(element).append(tbodyTag);
    };

    var getPropDataAsString = function (source, propName) {
        var sPropData = "";
        var propKey = propName + ":";
        var sSoruce = source.toString();
        var indexOfPropData = sSoruce.indexOf(propKey);
        if (indexOfPropData != -1) {
            indexOfPropData += propKey.length;
            sPropData = sSoruce.slice(indexOfPropData);

            indexOfPropData = sPropData.indexOf(",");
            if (indexOfPropData != -1) {
                sPropData = sPropData.slice(0, indexOfPropData);
            }
            else {
                indexOfPropData = sPropData.indexOf("}");
                sPropData = sPropData.slice(0, indexOfPropData);
            }
        }
        return sPropData.trim();
    }

    var getReturnDataAsString = function (source) {
        var sReturnData = "";
        var sSource = source.toString();
        var returnKey = "return ";
        var indexOfReturnData = sSource.indexOf(returnKey);
        if (indexOfReturnData != -1) {
            indexOfReturnData += returnKey.length;
            sReturnData = sSource.slice(indexOfReturnData);
            indexOfReturnData = sReturnData.indexOf(" }");
            sReturnData = sReturnData.slice(0, indexOfReturnData);
        }
        return sReturnData.trim();
    }

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