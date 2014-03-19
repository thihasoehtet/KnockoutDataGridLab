﻿(function ($, window) {
    //Create ViewModel 
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

    //Bind ViewModel 
    $(document).ready(function () {
        ko.applyBindings(viewModel, $(".container").get(0));
    });

    window.addRow = function () {
        var len = viewModel.data().length;
        viewModel.data.push(new Person({ ID: "ID" + len, Company: "Company" + len, Name: "Name" + len }));
    };    
})(jQuery, window);