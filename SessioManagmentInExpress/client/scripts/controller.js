var app = angular.module('LoginForm',['ngMaterial','ngAnimate','ngAria','ngMessages','ServiceModule'])
.controller('Ctrl', function($scope,loginService){
  $scope.vm = {
        email: '',
       	password: ''
  };
    
    $scope.vm.submit=function()
    {
         console.log($scope.vm);
         loginService.sendLoginDataObj($scope.vm).then(function(response){
         console.log("response sent");
         console.log(response);
        })
    }
  
   
    
});