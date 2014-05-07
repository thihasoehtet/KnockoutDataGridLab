(function ($, ko, window) {
	function Person(data) {
		this.ID = ko.observable(data.ID);
		this.Company = ko.observable(data.Company);
		this.Name = ko.observable(data.Name);
	};

	function ViewModel() {
	    debugger;
	    var self = this;
	    self.pageSize = ko.observable(2);
	    self.currentPage = ko.observable(1);
	    self.filterValue = ko.observable("");
	    self.sortState = ko.observable({ prop: "ID", asc: true });
	    self.data = ko.observableArray([
            new Person({ ID: "ANATR", Company: "Ana Trujillo Emparedados y helados", Name: "Ana Trujillo" }),
            new Person({ ID: "ANTON", Company: "Antonio Moreno Taqueria", Name: "Antonio Moreno" }),
            new Person({ ID: "AROUT", Company: "Around the Horn", Name: "Thomas Hardy" }),
            new Person({ ID: "BERGS", Company: "Berglunds snabbkop", Name: "Christina Berglund" })
	    ]);
	    self.tableData = ko.computed(function () {
	        var filteredData = ko.utils.arrayFilter(self.data(), function (item) {
	            var source = item.ID() + " " + item.Company() + " " + item.Name();
	            var search = self.filterValue();
	            return source.toLowerCase().indexOf(search.toLowerCase()) > -1;
	        });
	        var prop = self.sortState().prop;
	        var asc = self.sortState().asc;
	        var sortedData = filteredData.sort(function (x, y) {
	            if (asc) {
	                return x[prop]() < y[prop]() ? -1 : x[prop]() > y[prop]() ? 1 : 0;
	            }
	            return x[prop]() < y[prop]() ? 1 : x[prop]() > y[prop]() ? -1 : 0;
	        });

	        var pageSize = self.pageSize();
	        var currentPage = self.currentPage();

	        var end = currentPage * pageSize;
	        var start = end - (pageSize - 1);

	        var pagedData = sortedData.slice((start - 1), end);

	        return pagedData;
	    });

	    self.onFilter = function (data, event) {
	        self.filterValue(event.target.value);
	    };

	    self.onSort = function (data, event) {	        
	        var prop = event.target.dataset.prop;
	        var newState;
	        if (prop == self.sortState().prop) {
	            newState = { prop: self.sortState().prop, asc: !self.sortState().asc };
	        } else {
	            newState = { prop: prop, asc: true };
	        }
	        self.sortState(newState);
	    };

	    self.onPageChange = function (data, event) {
	        debugger;
	        self.currentPage(event.target.value);
	    };
	};	

	ko.applyBindings(new ViewModel());
})(jQuery, ko, window);