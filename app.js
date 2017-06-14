'use strict';
(function(){

  var app = angular.module("transactionBookApp", ['ngRoute', 'angular-loading-bar']);
  app.config(function($routeProvider){

    $routeProvider

    .when("/book", {
      templateUrl: 'app/views/book.html',
      controller: "BookCtrl"
    })
    .when("/book/:bookId", {
      templateUrl: 'app/views/bookdetail.html',
      controller: "BookTransactionCtrl"
    })
    .otherwise({redirectTo: "/book"})
  });
}());
