(function ($, window) {
    var vm = {
        myObsArray: ko.observableArray([
            { firstName: 'John', lastName: 'Doe' },
            { firstName: 'KK', lastName: 'Ace' },
            { firstName: 'Jane', lastName: 'Doe' }
        ])
    };

    ko.applyBindings(vm);
})(jQuery, window);