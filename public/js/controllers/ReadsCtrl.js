;
(function () {
    'use strict'

    angular.module('website-app')
        .controller('ReadsCtrl', ReadsCtrl);


ReadsCtrl.$inject = ['PocketReadsService']

function ReadsCtrl(PocketReadsService) {

    var ctrl = this;
    getReads();

    function getReads() {
        PocketReadsService.getReads()
            .$promise.then(function (result) {
                var arr_reads = Object.keys(result.list).map(function(k) { return result.list[k] });
                arr_reads.forEach(function(item) {
                    if (item.authors) {
                        item.author = Object.keys(item.authors).map(function(k) { return item.authors[k].name }).join(",");
                    }
                    else {
                        item.author = "N/A";
                    }
                    item.excerpt = item.excerpt.substring(0, 150) + "...";
                    item.displayDate = moment.unix(item.time_added).format("MM/DD");
                })
                arr_reads.sort(function(a, b) {
                    return b.time_added - a.time_added;
                })
                ctrl.reads = arr_reads;
            });
    }
}
})();
