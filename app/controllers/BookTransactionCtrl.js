'use strict';

(function () {
    var transactionBookApp = angular.module("transactionBookApp");

    var BookTransactionCtrl = function ($scope, $http)
    {
    	$scope.working = 'Angular is Working';
        //common error function
    	var onError = function (error) {
            $scope.error = error.data;
        };
        //end error function

        //get all booke
    	var onTransactionGetCompleted = function(response){
    		$scope.transactions = response.data;
            console.log($scope.transactions);
    	}


        var refresh = function(){
        	$http.get('/book/transactions/')
        		.then(onTransactionGetCompleted, onError);
        	console.log('Response received...');
        }

        refresh();
    	//end get all books

        //get books by Id
        var onGetByIdCompleted = function(response){
            $scope.transactions = response.data;
            console.log(response.data);
        };

        $scope.searchTransactionById = function(id){
            $http.get('/book/transactions/' + id)
                    .then(onGetByIdCompleted, onError);
            console.log(id);
        };
        //end get book by Id

        //add new book
        var onAddTransactionCompleted = function(response){
            $scope.transactions = response.data;
            console.log(response.data);
            refresh();
        };
        $scope.addTransaction = function(transaction){
            $http.post('book/addTransaction/', transaction)
                    .then(onAddTransactionCompleted, onError);
            console.log(transaction);
        };
        //end add new book transaction

        //delete book transaction
        $scope.deleteTransaction = function(id){
            $http.delete('book/deleteTransaction/' + id)
                .then(onTransactionDeleteCompleted,  onError);
            console.log(id);
        };

        var onTransactionDeleteCompleted = function(response){
            $scope.transactions = response.data;
            console.log(response.data);
            refresh();
        };
        //end delete book transaction

        //update book transaction
        $scope.updateTransaction = function(transaction){
            $http.put("book/updateTransaction", book)
                .then(onUpdateTransactionCompleted, onError);
                    console.log(book);
        };

        var onUpdateTransactionCompleted = function(response){
            $scope.transactions = null;
            console.log(response.data);
            refresh();
        };
        //end update book transaction
    }
    transactionBookApp.controller('BookTransactionCtrl', BookTransactionCtrl);
}());
