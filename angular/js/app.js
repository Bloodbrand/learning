var testApp = angular.module('testApp', ['ngMessages', 'ngResource']);

testApp.controller('mainController',
['$scope', '$log', '$filter', '$resource', '$timeout', '$interval',
function($scope, $log, $filter, $resource, $timeout, $interval){

/////////////////////////////////////////
    $scope.name = 'Radu';
    $scope.ticks = 0;
/////////////////////////////////////////
    $log.info($scope.name);
    $log.info($scope.formattedName);
/////////////////////////////////////////
    $scope.formattedName = $filter('uppercase')($scope.name);
/////////////////////////////////////////
    $timeout(function(){
        $scope.name += " and All!";
        $scope.formattedName = $filter('uppercase')($scope.name);
    }, 3000);

    $interval(function(){
        $scope.ticks++;
    }, 100);
/////////////////////////////////////////
    $scope.toLowercase = function(str){
        return $filter('lowercase')(str);
    };
/////////////////////////////////////////

}]);