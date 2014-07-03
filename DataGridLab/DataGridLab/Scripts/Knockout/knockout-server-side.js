(function (window, $, ko) {
    function KoTable(pageSize, payload, sortValue) {
        var self = this;
        self.index = ko.observable(1);
        self.size = ko.observable(pageSize);
        self.data = ko.observableArray([]);
        self.recordsTotal = ko.observable(0);
        self.payload = payload;
        self.sortValue = sortValue;        
        self.goToPage = function (targetIndex) {
            if (targetIndex < 1 || targetIndex > self.pagesTotal()) {
                return;
            }
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                url: $("#hidPostUrl").val(),
                // since using JSON.stringify(), need to reference json2.js to work in older browser don't have json encoder/decoder 
                data: JSON.stringify({
                    start: (targetIndex - 1) * self.size(),
                    length: self.size(),
                    payload: { name: self.payload.name() },
                    sortValue: { key: sortValue.key(), direction: sortValue.direction() }
                })
            })
            .done(function (pagedResult) {
                self.data(pagedResult.data);
                self.recordsTotal(pagedResult.recordsTotal);

                self.index(targetIndex);
            });
        };
        self.onNext = function () {
            self.goToPage(self.index() + 1);
        };
        self.onPrev = function () {
            self.goToPage(self.index() - 1);
        }
        self.pagesTotal = ko.computed(function () {
            if (self.size() < 1) {
                return 1;
            }
            var pagesTotal = Math.ceil(self.recordsTotal() / self.size());
            if (pagesTotal < 1) {
                return 1;
            }
            return pagesTotal;
        });
        self.hasNext = ko.computed(function () {
            if (self.index() < self.pagesTotal()) {
                return true;
            }
            return false;
        });
        self.hasPrev = ko.computed(function () {
            if (self.index() > 1) {
                return true;
            }
            return false;
        });
        self.init = function () {
            self.goToPage(1);
        };
    };

    // Page View Setup
    function ViewModel(table) {
        var self = this;
        self.table = table;
    };

    var pageSize = 2;
    var payload = { name: ko.observable("") };
    var sortValue = { key: ko.observable("Age"), direction: ko.observable("asc") };

    var koTable = new KoTable(pageSize, payload, sortValue);

    var vm = new ViewModel(koTable);
    ko.applyBindings(vm);
})(window, jQuery, ko);