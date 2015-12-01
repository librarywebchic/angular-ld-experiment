app.controller('ldcontroller', ['$scope', '$http', function($scope, $http) {
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
	            $scope.author = kb.the(kb.the($rdf.sym(uri), SCHEMA('creator')), $rdf.sym('http://schema.org/name')).value;
	            $scope.datePublished = kb.the($rdf.sym(uri), SCHEMA('datePublished')).value;
	            subjectNodes = kb.each($rdf.sym(uri), SCHEMA('about'));
	            subjects = [];
	            for (i = 0; i < subjectNodes.length; i++) {
	                if (kb.the(subjectNodes[i], SCHEMA('name'))) {
	                 subjects.push(kb.the(subjectNodes[i], SCHEMA('name')));
	                }
	            }
	            $scope.subjects = subjects;
	            
	            $scope.bookEdition = kb.the($rdf.sym(uri), SCHEMA('bookEdition')).value;
	            $scope.copyrightYear = kb.the($rdf.sym(uri), SCHEMA('copyrightYear')).value;
	            $scope.work = kb.the($rdf.sym(uri), SCHEMA('exampleOfWork')).uri;
	            $scope.genre = kb.the($rdf.sym(uri), SCHEMA('genre')).value;
	            $scope.inLanguage = kb.the($rdf.sym(uri), SCHEMA('inLanguage')).value;
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
    }]);