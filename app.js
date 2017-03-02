var app = angular.module('toDoApp', ["ngStorage"]);
app.controller('todoCtrl', ['$scope', function($scope, $localStorage) {
    $scope.saved = localStorage.getItem('todoList');
    $scope.todoList = (localStorage.getItem('todoList') !== null) ? JSON.parse($scope.saved) : [];
    //$scope.todoList = [];
    localStorage.setItem('todoList', JSON.stringify($scope.todoList));

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todoList, function(task){
        count += task.done ? 0 : 1;
      });
      return count;
    };

    $scope.todoAdd = function() {
        $scope.todoList.push( {text: $scope.todoInput, done: false} );
        $scope.todoInput = ""; //clear input after pushing
        localStorage.setItem('todoList', JSON.stringify($scope.todoList));
    };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(task) {
            if (!task.done) { // if item wasn't checked - add to new list, otherwise, don't
              $scope.todoList.push(task);
            }
        });
        localStorage.setItem('todoList', JSON.stringify($scope.todoList));
    };
}]);
