(function (window, $, ko) {
    function DataSource(dataSourceHandler) {
        var self = this;
        self.dataSourceHandler = dataSourceHandler;
        self.get = function (pageIndex, pageSize, payload, sortValue, setDataCallback) {
            self.dataSourceHandler(pageIndex, pageSize, payload, sortValue, setDataCallback);
        };
    };

    function KoTablePager(currentPageIndex, pageSize, payload, sortValue, dataSource, dataTarget) {
        var self = this;
        self.currentPageIndex = currentPageIndex;
        self.pageSize = pageSize;
        self.payload = payload;
        self.sortValue = sortValue;
        self.dataSource = dataSource;
        self.dataTarget = dataTarget;
        self.onNext = function () {
            self.goToPage(self.currentPageIndex() + 1);
        };
        self.onPrev = function () {
            self.goToPage(self.currentPageIndex() - 1);
        };
        self.goToPage = function (targetPageIndex) {
            self.dataSource.get(targetPageIndex, self.pageSize(), self.payload, self.sortValue, function (data) {
                self.dataTarget(data);
            });            
        };
    };

    function KoTable(defaultPageIndex, pageSize, dataSourceHandler, payload, sortValue) {
        var self = this;
        self.index = ko.observable(defaultPageIndex);
        self.size = ko.observable(pageSize);
        self.data = ko.observableArray([]);
        self.payload = payload;
        self.sortValue = sortValue;
        self.dataSource = new DataSource(dataSourceHandler);
        self.pager = new KoTablePager(self.index, self.size, self.payload, self.sortValue, self.dataSource, self.data);
    };

    // Page View Setup
    function ViewModel(table) {
        var self = this;
        self.table = table;
        self.search = function () {
            self.table.pager.goToPage(1);
        };
        self.sort = function () {
            self.table.pager.goToPage(1);
        };        
    };

    function dataSourceHandler(pageIndex, pageSize, payload, sortValue, setDataCallback) {
        debugger;
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: $("#hidPostUrl").val(),
            // since using JSON.stringify(), need to reference json2.js to work in older browser don't have json encoder/decoder 
            data: JSON.stringify({
                PageIndex: pageIndex,
                PageSize: pageSize,
                Payload: { Name: payload.name() },
                SortValue: { Key: sortValue.key(), Direction: sortValue.direction() }
            })
        })
        .done(function (data) {
            setDataCallback(data);
        });        
    };

    var defaultPageIndex = 1;
    var pageSize = 10;
    var payload = { name: ko.observable("") };
    var sortValue = { key: ko.observable("Age"), direction: ko.observable("asc") };

    var koTable = new KoTable(defaultPageIndex, pageSize, dataSourceHandler, payload, sortValue);    

    var vm = new ViewModel(koTable);
    ko.applyBindings(vm);    
})(window, jQuery, ko);