;
(function () {
    'use strict'

    angular.module('website-app')
        .controller('TablaDocsCtrl', TablaDocsCtrl);


TablaDocsCtrl.$inject = ['TablaDocsService']

function TablaDocsCtrl(TablaDocsService) {
    var ctrl = this;

    var getDictionary = function() {
        var k = {}
        var dictionary = {}
        TablaDocsService.getUniqueValuesForKey({
                key: 'db_keys'
            })
            .$promise.then(function(keys) {
                k = keys;
                keys["vals"].forEach(function(key) {
                            TablaDocsService.getUniqueValuesForKey({
                                            key: key
                                        })
                                        .$promise.then(function(result) {
                                            dictionary[key] = result["vals"];
                                        })
                        })
                ctrl.dictionary = dictionary;
                ctrl.keys = keys["vals"];
            });
    }

    ctrl.getValues = function(key) {
        return ctrl.dictionary[key];
    }

    getDictionary();

}

})();
