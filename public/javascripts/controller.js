angular.module('todoController', [])
	// inject the Todo service factory into our page controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET VIEW
		// when landing on the main page, get all todos and show them
		// by using teh service
		Todos.get()
      .success(function(data) {
        $scope.todos = data;
        $scope.loading = false;
      });

		// CREATE VIEW
		$scope.create = function() {
      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.formData.text != undefined) {
				$scope.loading = true;
				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)
					// if successful creation, fetch all todos
					.success(function(data) {
            // clear the form so our user is ready to enter another
						$scope.formData = {};
            Todos.get().success(function(data){$scope.todos = data});
            $scope.loading = false;
					});
			}
		};

		// DELETE VIEW
		// delete a todo after checking it
		$scope.delete = function(id) {
			$scope.loading = true;
			Todos.delete(id)
				// if successful on deletion, fetch all todos
        .success(function(data) {
          Todos.get().success(function(data){$scope.todos = data});
          $scope.loading = false;
				});
		};
	}]);
