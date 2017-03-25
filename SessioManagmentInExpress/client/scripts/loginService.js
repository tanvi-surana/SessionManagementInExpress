var serviceModule=angular.module('ServiceModule',[]);
serviceModule.service('loginService',['$http',function($http){
    var sendLoginData=function(obj)
    {
        return $http({
            method:'POST',
            dataType:'json',
            params:obj,
            headers:{
                'Content-Type':'application/json'
            },
            url:'http://localhost:3000/login'
        }).then(function(response){
            return response;
        })
    }
    
    return{
        sendLoginDataObj:sendLoginData
    }
}])