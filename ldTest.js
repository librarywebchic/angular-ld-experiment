/**
 * 
 */
var app = angular.module('app', ['angularJsonld']);

app.config(function(jsonldContextProvider){
  jsonldContextProvider.add({
    "schema": "http://schema.org/",
    "name": "schema:name",
    "author": "schema:author"
  });
});

app.controller('LinkedDataController', function($scope){

  var JsonldRest;
  /* Configure the API baseUrl */
  JsonldRest.setBaseUrl('http://worldcat.org');

  /* A handler to a server collection of persons with a local context interpretation */
  var bib = JsonldRest.collection('/oclc');

  /* We retrieve the bib http://www.worldcat.org/oclc/ */
  var res = bib.one('7977212').get();
  $scope.res = res;

});