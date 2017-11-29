var app=angular.module("myApp",['ngRoute','ngResource']);

//routes

app.config(function($routeProvider){
    $routeProvider
    .when('/',{
     templateUrl:'pages/home.html',   
       controller:'homeController' 
    })
    .when('/forecast',{
     templateUrl:'pages/forecast.html',   
       controller:'forecastController' 
    })
    
});
/*app.config(function($sceDelegateProvider) {
 $sceDelegateProvider.resourceUrlWhitelist([
   // Allow same origin resource loads.
   'self',
   // Allow loading from our assets domain.  Notice the difference between * and **.
   'http://api.openweathermap.org/**']);
 });*/

//SERVICES
app.service('cityService',function(){
    this.city="Toronto,ON";
});

//controllers
app.controller("homeController",['$scope','cityService',function($scope,cityService){
    $scope.city=cityService.city;
     $scope.$watch('city',function(){
        cityService.city=$scope.city;
    });
    
}]);
app.controller("forecastController",['$scope','$resource','cityService',function($scope,$resource,cityService){
     $scope.city=cityService.city;
$scope.weatherAPI=$resource("http://samples.openweathermap.org/data/2.5/forecast?q=London,&appid=b5ab9b7b0c62d581a84f06e829638d0b");
 $scope.weatherResult=$scope.weatherAPI.get({q:$scope.city,cnt:2});
    console.log($scope.weatherResult);
    
    
}]);