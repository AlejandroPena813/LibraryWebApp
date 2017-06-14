'use strict';

(function () {
    var transactionBookApp = angular.module("transactionBookApp");

    var BookCtrl = function ($scope, $http)
    {
    	$scope.working = 'Angular is Working';
        //common error function
    	var onError = function (error) {
            $scope.error = error.data;
        };
        //end error function

        //get all booke
    	var onBookGetCompleted = function(response){
    		$scope.books = response.data;
            console.log($scope.books);
    	}


        var refresh = function(){
        	$http.get('/books')
        		.then(onBookGetCompleted, onError);
        	console.log('Response received...');
        }

        refresh();
    	//end get all books

        //get books by Id
        var onGetByIdCompleted = function(response){
            $scope.book = response.data;
            console.log(response.data);
        };

        $scope.searchBook = function(id){
            $http.get('/book/' + id)
                    .then(onGetByIdCompleted, onError);
            console.log(id);
        };
        //end get book by Id

        //add new book
        var onAddBookCompleted = function(response){
            $scope.book = response.data;
            console.log(response.data);
            refresh();
        };
        $scope.addBook = function(book){
            $http.post('/addBook', book)
                    .then(onAddBookCompleted, onError);
            console.log(book);
        };
        //end add new book

        //delete book
        $scope.deleteBook = function(id){
            $http.delete('/deleteBook/' + id)
                .then(onBookDeleteCompleted,  onError);
            console.log(id);
        };

        var onBookDeleteCompleted = function(response){
            $scope.book = response.data;
            console.log(response.data);
            refresh();
        };
        //end delete book

        //update book
        $scope.updateBook = function(book){
            $http.put("/updateBook", book)
                .then(onUpdateBookCompleted, onError);
                    console.log(book);
        };

        var onUpdateBookCompleted = function(response){
            $scope.book = null;//response.data;
            console.log(response.data);
            refresh();
        };
        //end update book
    }
    transactionBookApp.controller('BookCtrl', BookCtrl);
}());
