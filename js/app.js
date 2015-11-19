/**
 * 
 */
var app = angular.module('app', ['angularJsonld']);

app.config(function(jsonldContextProvider){
  jsonldContextProvider.add({
    "schema": "http://schema.org/",
    "name": "schema:name",
    "author": "schema:author",
    "about": "schema:about"
  });
});