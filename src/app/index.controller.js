(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming, CommonService, managerService, $scope)
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

        function getValue(){
            return window.localStorage.getItem('token');
        }

        $scope.$watch(getValue, function(newValue){
            if (newValue === "true"){
                $scope.$apply(function(){
                    managerService.getEntities();
                    CommonService.getProfile(); });
            }
        });
    }
})();