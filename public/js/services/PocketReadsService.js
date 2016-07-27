(function() {

    angular.module('website-app')
        .factory('PocketReadsService', readsService)

    function readsService($resource, $http) {
        $http.defaults.withCredentials = true

        return $resource('/:endpoint', { },
            {
                getReads : { method:'get', params: {endpoint: 'pocketReads'  } },
            })
        }

})();

