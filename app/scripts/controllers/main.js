'use strict';

angular.module('choisirUnPrenomApp')

	.controller('choisirUnPrenomCtrl', ['$scope', 'donneMoiDesPrenoms' ,function ($scope, donneMoiDesPrenoms) {

		$scope.nom = 'Millard';
		$scope.sexe = 'FILLE';
		$scope.prenomPropose = '';
		$scope.listeDesPrenomsGardes = [];
		$scope.listeDesPrenomsRejetes = [];
		$scope.prenomAProposer = [];

		$scope.onGarde = function() {
			$scope.listeDesPrenomsGardes.push($scope.prenomPropose);
			$scope.changerDePrenom();
		};

		$scope.poubelle = function() {
			$scope.listeDesPrenomsRejetes.push($scope.prenomPropose);
			$scope.changerDePrenom();
		};

		$scope.changerDePrenom = function () {
			if($scope.prenomAProposer.length == 0) {
				$scope.prenomAProposer = donneMoiDesPrenoms($scope.sexe);
			}
			$scope.prenomPropose = $scope.prenomAProposer.pop();
		}

		$scope.changerDePrenom();

	}])


	.factory('donneMoiDesPrenoms', function() {
		return function(sexe) {
			// TODO bien mélanger les prénoms
			if(sexe === 'FILLE') return ['Paulette', 'Georgette', 'binette', 'Stoukette', 'Zezette'];
			if(sexe === 'GARCON') return ['Paul', 'George', 'binou', 'Stouk', 'Ziz'];
			return ['Paulette', 'Georgette', 'binette', 'Stoukette', 'Zezette', 'Paul', 'George', 'binou', 'Stouk', 'Ziz']
		};
	})
;
