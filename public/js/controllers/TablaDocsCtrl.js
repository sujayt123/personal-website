;
(function () {
    'use strict'

    angular.module('website-app')
        .controller('TablaDocsCtrl', TablaDocsCtrl);

TablaDocsCtrl.$inject = ['TablaDocsService', '$httpParamSerializer'];

function TablaDocsCtrl(TablaDocsService, $httpParamSerializer) {
    var ctrl = this;
    ctrl.showForm = true;
    ctrl.model = {}

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

    ctrl.submitForm = function() {
        TablaDocsService.getTablaDocs(ctrl.model)
            .$promise.then(function(result) {
                ctrl.showForm = false;
                ctrl.compositions = result["vals"].map(
                    function(x) {
                        console.log(JSON.stringify(x.bols).replace(new RegExp("\\n","g"), "<br /"));
                        return JSON.stringify(x.bols).replace(new RegExp("\n","g"), "<br /");
                    }
                );
            })
    }

    getDictionary();

}

})();
