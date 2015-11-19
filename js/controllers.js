app.controller('ldcontroller', function(JsonldRest){
	/* Configure the API baseUrl */
	  JsonldRest.setBaseUrl('http://experiment.worldcat.org');

	  /* A handler to a server collection of persons with a local context interpretation */
	  var bib = JsonldRest.collection('oclc');
	  
	  /* We retrieve the bib http://www.worldcat.org/oclc/ */
	  var res = bib.one('7977212.jsonld').get();
	  
	  console.log(res.about);
});