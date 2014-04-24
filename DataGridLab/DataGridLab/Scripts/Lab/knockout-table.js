(function ($, ko, window) {
    ko.bindingHandlers.table = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            buildTable(element, valueAccessor);
            applyChildBindingsToDescendants(element, valueAccessor, bindingContext);
            // Tell KO *not* to bind the descendants itself, otherwise they will be bound twice
            return { controlsDescendantBindings: true };
        }
    };

    var applyChildBindingsToDescendants = function (element, valueAccessor, bindingContext) {
        var _bodyData = valueAccessor();
        if (valueAccessor().bodyData) {
            _bodyData = valueAccessor().bodyData;
        }
        var _headData = {};
        if (valueAccessor().headData) {
            _headData = valueAccessor().headData;
        }
        // Make a modified binding context, with a extra properties, and apply it to descendant elements
        var childBindingContext = bindingContext.createChildContext(
            bindingContext.$rawData,
            null, // Optionally, pass a string here as an alias for the data item in descendant contexts
            function (context) {
                ko.utils.extend(context, { headData: _headData, bodyData: _bodyData });
            });
        ko.applyBindingsToDescendants(childBindingContext, element);
    };

    var buildTable = function (element, valueAccessor) {
        var table = element;
        if (!$(element).is('table')) {
            table = addTable(element);
        }
        renderthead(table, valueAccessor);
        rendertbody(table, valueAccessor);
    };

    var addTable = function (element) {
        var table = document.createElement("table");
        $(element).append(table);
        return table;
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
                template = '{ name: \'' + value.theadTemplate + '\', data: headData }';
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
                template = '{ name: \'' + value.tbodyTemplate + '\', foreach: bodyData }';
            }
            tbodyTag = '<tbody data-bind="template: ' + template + '"></tbody>';
        }
        else {
            if (value.bodyData) {
                var tds = ""
                for (var prop in value.bodyData()[0]) {
                    tds += '<td data-bind="text: ' + prop + '"></td>';
                }
                tbodyTag = '<tbody data-bind="foreach: bodyData"><tr>' + tds + '</tr></tbody>';
            }
            else {
                var tds = ""
                for (var prop in value()[0]) {
                    tds += '<td data-bind="text: ' + prop + '"></td>';
                }
                tbodyTag = '<tbody data-bind="foreach: bodyData"><tr>' + tds + '</tr></tbody>';
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
    };

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
    };
})(jQuery, ko, window);