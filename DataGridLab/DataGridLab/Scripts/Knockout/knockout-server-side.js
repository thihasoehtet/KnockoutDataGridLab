(function (window, $, ko) {
    function DataSource(callback) {
        var self = this;
        self.get = function (pageIndex, pageSize, filterValues, sorterValues) {
            var data = callback(pageIndex, pageSize, filterValues, sorterValues);
            return data;
        };
    };

    function KoTablePager(pageSize, filterValues, sorterValues, dataSource, dataTarget) {
        var self = this;
        self.pageSize = pageSize;
        self.filterValues = filterValues;
        self.sorterValues = sorterValues;
        self.dataSource = dataSource;
        self.dataTarget = dataTarget;
        self.onNext = function (currentPageIndex) {
            self.onPageChange(currentPageIndex + 1);
        };
        self.onPrev = function (currentPageIndex) {
            self.onPageChange(currentPageIndex - 1);
        };
        self.goToPage = function (targetPageIndex) {
            var newData = self.dataSource.get(targetPageIndex, self.pageSize, self.filterValues, self.sorterValues);
            self.dataTarget(newData);
        };
    };

    function KoTable(dataSourceHandler) {
        var self = this;
        self.index = ko.observable(1);
        self.size = ko.observable(10);        
        self.data = ko.observableArray([]);
        self.filterValues = ko.observableArray([]);
        self.sorterValues = ko.observableArray([]);
        self.dataSource = new DataSource(dataSourceHandler);
        self.pager = new KoTablePager(self.size, self.filterValues, self.sorterValues, self.dataSource, self.data);
    };

    // Page View Setup
    function dataSourceHandler(pageIndex, pageSize, filterValues, sorterValues) {
        return [
                { Id: 1, Name: "Airi Satou", Position: "Accountant", Office: "Tokyo", Age: 33, StartDate: "28/11/2014" },
                { Id: 2, Name: "Bradley Greer", Position: "Software Engineer", Office: "London", Age: 41, StartDate: "13/10/2012" }
        ];
    };

    function ViewModel() {
        var self = this;
        self.table = new KoTable(dataSourceHandler);
    };

    var vm = new ViewModel();
    ko.applyBindings(vm);

    vm.table.pager.goToPage(1);
})(window, jQuery, ko);