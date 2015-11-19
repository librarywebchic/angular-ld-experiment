app.controller('ldcontroller', function($scope, $http) {
      kb = $rdf.graph();
      bib = 'http://www.worldcat.org/oclc/7977212';
      
      $http({
    	  method: 'GET',
    	  url: 'http://experiment.worldcat.org/oclc/7977212.rdf',
    	  //url: bib,
    	  headers: {
    		   'Accept': 'application/rdf+xml'
    		 },
    	}).then(function successCallback(response) {
    		$rdf.parse(response.data, kb, bib, 'application/rdf+xml');   
            $scope.name = kb.the($rdf.sym(bib), $rdf.sym('http://schema.org/name')).value;
            $scope.author = kb.the(kb.the($rdf.sym(bib), $rdf.sym('http://schema.org/creator')), $rdf.sym('http://schema.org/name')).value;
            $scope.datePublished = kb.the($rdf.sym(bib), $rdf.sym('http://schema.org/datePublished')).value;
            subjectNodes = kb.each($rdf.sym(bib), $rdf.sym('http://schema.org/about'));
            subjects = [];
            for (i = 0; i < subjectNodes.length; i++) {
                if (kb.the(subjectNodes[i], $rdf.sym('http://schema.org/name'))) {
                 subjects.push(kb.the(subjectNodes[i], $rdf.sym('http://schema.org/name')));
                }
            }
            $scope.subjects = subjects;
    	  }, function errorCallback(response) {
    		alert('Failed');
    		console.log(response);
    	  });
    });