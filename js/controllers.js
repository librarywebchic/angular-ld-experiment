app.controller('ldcontroller', ['$scope', '$http', function($scope, $http) {
	  $scope.entity = []
	  $scope.entity.id = '7977212';
	  $scope.entity.type = 'bib';
	  
	  $scope.submit = function() {
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
	            $scope.name = kb.the($rdf.sym(uri), $rdf.sym('http://schema.org/name')).value;
	            $scope.author = kb.the(kb.the($rdf.sym(uri), $rdf.sym('http://schema.org/creator')), $rdf.sym('http://schema.org/name')).value;
	            $scope.datePublished = kb.the($rdf.sym(uri), $rdf.sym('http://schema.org/datePublished')).value;
	            subjectNodes = kb.each($rdf.sym(uri), $rdf.sym('http://schema.org/about'));
	            subjects = [];
	            for (i = 0; i < subjectNodes.length; i++) {
	                if (kb.the(subjectNodes[i], $rdf.sym('http://schema.org/name'))) {
	                 subjects.push(kb.the(subjectNodes[i], $rdf.sym('http://schema.org/name')));
	                }
	            }
	            $scope.subjects = subjects;
	          console.log('In the $http function ' + $scope.subjects);  
	    	  }, function errorCallback(response) {
	    		alert('Failed');
	    		console.log(response);
	    	  });
	  };
    }]);