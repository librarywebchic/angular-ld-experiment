app.controller('ldcontroller', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {
	  $scope.entity = []
	  $scope.entity.id = '7977212';
	  $scope.entity.type = 'bib';
	  
	  
	  $scope.submit = function() {
		  var SCHEMA = $rdf.Namespace("http://schema.org/")
		  var WDRS = $rdf.Namespace("http://www.w3.org/2007/05/powder-s#")
		  
	      kb = $rdf.graph();
	      if ($scope.entity.type == 'bib'){
	      	uri = 'http://www.worldcat.org/oclc/' + $scope.entity.id;
	      	request_url = 'http://experiment.worldcat.org/oclc/' + $scope.entity.id + '.rdf'
	      	$scope.graphType = 'Bibliographic Record Graph';
	      } else {
	        uri = 'http://worldcat.org/entity/work/id/' + $scope.entity.id;
	        request_url = 'http://experiment.worldcat.org/entity/work/data/' + $scope.entity.id + '.rdf'
	        $scope.graphType = 'Work Graph';
	      }
	
	      $http({
	    	  method: 'GET',
	    	  url: request_url,
	    	  headers: {
	    		   'Accept': 'application/rdf+xml'
	    		 },
	    	}).then(function successCallback(response) {
	    		$rdf.parse(response.data, kb, uri, 'application/rdf+xml');   
	            $scope.name = kb.the($rdf.sym(uri), SCHEMA('name')).value;
	            $scope.author_name= kb.the(kb.the($rdf.sym(uri), SCHEMA('creator')), $rdf.sym('http://schema.org/name')).value;
	            $scope.author_id = kb.the($rdf.sym(uri), SCHEMA('creator')).uri;
	            $scope.datePublished = kb.the($rdf.sym(uri), SCHEMA('datePublished')).value;
	            subjectNodes = kb.each($rdf.sym(uri), SCHEMA('about'));
	            subjects = [];
	            for (i = 0; i < subjectNodes.length; i++) {
	                if (kb.the(subjectNodes[i], SCHEMA('name'))) {
	                 subjects.push(kb.the(subjectNodes[i], SCHEMA('name')));
	                }
	            }
	            $scope.subjects = subjects;
	            if (kb.the($rdf.sym(uri), SCHEMA('bookEdition'))){
	            	$scope.bookEdition = kb.the($rdf.sym(uri), SCHEMA('bookEdition')).value;
	    		}
	            if (kb.the($rdf.sym(uri), SCHEMA('copyrightYear'))){
	            	$scope.copyrightYear = kb.the($rdf.sym(uri), SCHEMA('copyrightYear')).value;
	    		}
	            $scope.work = kb.the($rdf.sym(uri), SCHEMA('exampleOfWork')).uri;
	            urlParts = $scope.work.split('/');
	            $scope.work_id = urlParts[urlParts.length -1];
	            if (kb.the($rdf.sym(uri), SCHEMA('genre'))){
	            	$scope.genre = kb.the($rdf.sym(uri), SCHEMA('genre')).value;
	            }
	            if (kb.the($rdf.sym(uri), SCHEMA('inLanguage'))) {
	            	$scope.inLanguage = kb.the($rdf.sym(uri), SCHEMA('inLanguage')).value;
	            }
	            $scope.publisher = kb.the(kb.the($rdf.sym(uri), SCHEMA('publisher')), SCHEMA('name')).value;
	            $scope.dataSet = kb.the(kb.the($rdf.sym(uri), WDRS('describedby')), $rdf.sym('http://rdfs.org/ns/void#inDataset')).uri;
	            
	            contributorNodes = kb.each($rdf.sym(uri), SCHEMA('contributor'));
	            contributors = [];
	            for (i = 0; i < contributorNodes.length; i++) {
	                if (kb.the(contributorNodes[i], SCHEMA('name'))) {
	                	contributors.push(kb.the(contributorNodes[i], SCHEMA('name')));
	                }
	            }
	            $scope.contributors = contributors;
	            
	            descriptionNodes = kb.each($rdf.sym(uri), SCHEMA('description'));
	            descriptions = [];
	            for (i = 0; i < descriptionNodes.length; i++) {
	                if (descriptionNodes[i].value) {
	                	descriptions.push(descriptionNodes[i].value);
	                }
	            }
	            $scope.descriptions = descriptions;
	            
	            productModelNodes = kb.each($rdf.sym(uri), SCHEMA('workExample'));
	            isbns = [];
	            for (i = 0; i < productModelNodes.length; i++) {
	            	isbnNodes = kb.each(productModelNodes[i], SCHEMA('isbn'));
	                if (isbnNodes) {
	                	for (n = 0; n < isbnNodes.length; n++) {
	                		isbns.push(isbnNodes[n].value);
	                	}
	                }
	            }
	            $scope.isbns = isbns;
	            
	    	  }, function errorCallback(response) {
	    		alert('Failed');
	    		console.log(response);
	    	  });
	  };
	  
	  $scope.openAuthor = function () {
	    	uri = $scope.author_id;
	      	request_url = 'http://localhost:3000/' + uri + '/rdf.xml';
	      	
	      	var SCHEMA = $rdf.Namespace("http://schema.org/")
	      	
	        kb = $rdf.graph();
	    	$http({
	    	  	  method: 'GET',
	    	  	  url: request_url,
	    	  	  headers: {
	    	  		   'Accept': 'application/rdf+xml'
	    	  		 },
	    	  	}).then(function successCallback(response) {
	    	  		$rdf.parse(response.data, kb, uri, 'application/rdf+xml');   
	    	  		$scope.names = kb.each($rdf.sym(uri), SCHEMA('name'));
	    	  		$scope.birthDate = kb.the($rdf.sym(uri), SCHEMA('birthDate')).value;
	    	  		$scope.deathDate = kb.the($rdf.sym(uri), SCHEMA('deathDate')).value;
	    	          
	    	  	  }, function errorCallback(response) {
	    	  		alert('Failed');
	    	  		console.log(response);
	    	  	  });
	    	ngDialog.open({
	    	    template: 'author-template.html',
	    	    className: 'ngdialog-theme-default',
	    	    scope: $scope
	    	});
	    };
	  
	  $scope.openIdentifiers = function () {
	      	request_url = 'http://experiment.worldcat.org/entity/work/data/413352.rdf';
	      	
	      	var SCHEMA = $rdf.Namespace("http://schema.org/")
	      	var LIBRARY = $rdf.Namespace("http://purl.org/library/")
	      	
	    	$http({
	    	  	  method: 'GET',
	    	  	  url: request_url,
	    	  	  headers: {
	    	  		   'Accept': 'application/rdf+xml'
	    	  		 },
	    	  	}).then(function successCallback(response) {
	    	  		console.log('got work!');
	    	        workStore = $rdf.graph();
  	    	  		$rdf.parse(response.data, workStore, $scope.work, 'application/rdf+xml');
  	    	  		
  	    	  		bibs = workStore.each(uri, SCHEMA('workExample'));
  	    	  		
  	    	  		// load all the bibURIS into a single graph
  	    	  		for (i = 0; i < bibs.length; i++){
  	    	  			urlParts = bibs[i].uri.split('/');
  	    	  			oclcNumber = urlParts[urlParts.length -1];
  	    	  			request_url = request_url = 'http://experiment.worldcat.org/oclc/' + oclcNumber + '.rdf';
  	    	  			parse_data(request_url, bibs[i].uri, workStore);
  	    	  		}
  	    	  		console.log('all the bibs are loaded!')
  	    	  		
  	    	  		// get all the IBSNs from the graph
  	    	  		var sparqlQuery = 'PREFIX schema: <http://schema.org> \
                       SELECT ?isbn \
                       WHERE {' +
                         '<' + uri + '> schema:workExample ?ocn . \
                         ?work schema:workExample ?ocn . \
                         ?ocn schema:workExample ?productModel . \
                         ?productModel schema:isbn ?isbn . \
                       }';
  	    	  		var query = $rdf.SPARQLToQuery(sparqlQuery, true, workStore);

  	    	  		workStore.fetcher = null;
  	    	  		workStore.query(query, function(result) {
  	    	  			console.log(result);
  	    	  			var isbns = result['?isbn'];
  	    	  			console.log(isbns);
  	    	  		});
	    	        
	    	  	  }, function errorCallback(response) {
	    	  		alert('Failed to get work');
	    	  		console.log(response);
	    	  	  });
	    	ngDialog.open({
	    	    template: 'ids-for-work-grouping-template.html',
	    	    className: 'ngdialog-theme-plain',
	    	    data: $scope.workExamples
	    	});
	    };
	    
	    function parse_data (request_url, uri, store){
	    	$http({
	    	  	  method: 'GET',
	    	  	  url: request_url,
	    	  	  headers: {
	    	  		   'Accept': 'application/rdf+xml'
	    	  		 },
	    	  	}).then(function successCallback(response) {   
	    	  		$rdf.parse(response.data, store, uri, 'application/rdf+xml')  
	    	  	  }, function errorCallback(response) {
	    	  		alert('Failed to get bib -' + uri);
	    	  		console.log(response);
	    	});
	  			
	    }
    }]);