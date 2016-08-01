;
(function() {
'use strict'

    angular.module('website-app')
        .factory('TablaDocsService', tablaDocsService)

    function tablaDocsService($resource, $http) {
        $http.defaults.withCredentials = true

        return $resource('/:endpoint/:key', { },
            {
                getTablaDocs : { method:'get', params: {endpoint: 'tablaDocs', key: ''} },
                getUniqueValuesForKey : {method: 'get', params: {endpoint: 'tablaDocs'}}
            })
        }

})();

