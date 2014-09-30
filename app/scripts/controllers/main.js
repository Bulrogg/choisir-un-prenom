'use strict';

// TODO permettre d'ajouter un prénom directement dans la liste avec autocompletion

// TODO ajouter de la persistence local storage
// TODO Ajouter un bouton pour réinitialiser le local storage
// TODO ajouter un bouton pour exporter la conf + recherche

// TODO remplacer alerts par des modals
// TODO travailler l'ergonomie
// TODO rose si fille / bleu si garcon / terre si mixte

// TODO externaliser l'url du site des prenoms dans les properties
// TODO sortir les plistes de renoms dans une constante

angular.module('choisirUnPrenomApp')

.controller('choisirUnPrenomCtrl', ['$scope', '$window', 'donneMoiDesPrenoms' ,function ($scope, $window, donneMoiDesPrenoms) {

	$scope.nom = 'Millard';
	$scope.sexe = 'FILLE';
	$scope.prenomPropose = '';
	$scope.prenomProposeUrlInfo = '';
	$scope.listeDesPrenomsGardes = [];
	$scope.listeDesPrenomsRejetes = [];
	$scope.prenomAProposer = [];

	$scope.onGarde = function() {
		$scope.listeDesPrenomsGardes.push($scope.prenomPropose);
		$scope.chargerLePrenomAProposerSuivant();
	};

	$scope.poubelle = function() {
		$scope.listeDesPrenomsRejetes.push($scope.prenomPropose);
		$scope.chargerLePrenomAProposerSuivant();
	};

	$scope.chargerLePrenomAProposerSuivant = function () {
		var nouveauPrenomAProposer = $scope.prenomAProposer.pop();
		$scope.prenomPropose = nouveauPrenomAProposer;
			var prenomPourUrl = nouveauPrenomAProposer ? nouveauPrenomAProposer.sansAccent().toUpperCase() : '';
			$scope.prenomProposeUrlInfo = nouveauPrenomAProposer ? 'http://www.prenoms.com/prenom/'+prenomPourUrl+'.html' : '';
		};

		$scope.chargerListePrenomsAProposer = function () {
			$scope.prenomAProposer = donneMoiDesPrenoms($scope.sexe);
		};

		$scope.rechargerPrenomGarde = function(prenomARecharger) {
			$scope.rechargerPrenomDepuisLaListe('listeDesPrenomsGardes', prenomARecharger);
		};

		$scope.rechargerPrenomRejete = function(prenomARecharger) {
			$scope.rechargerPrenomDepuisLaListe('listeDesPrenomsRejetes', prenomARecharger);
		};

		$scope.rechargerPrenomDepuisLaListe = function(listePrenomsSource, prenomARecharger) {
			$scope[listePrenomsSource] = $window._.without($scope[listePrenomsSource], prenomARecharger);
			$scope.prenomAProposer.push($scope.prenomPropose, prenomARecharger);
			$scope.chargerLePrenomAProposerSuivant();	
		};

		$scope.reinitialiserSystemePropositionPrenom = function() {
			// Récupération de tous les prénoms
			$scope.chargerListePrenomsAProposer();

			// Suppression des prénoms déjà rencontrés
			var prenomsDejaRencontres = $scope.listeDesPrenomsGardes.concat($scope.listeDesPrenomsRejetes);
			$scope.prenomAProposer = $window._.difference($scope.prenomAProposer, prenomsDejaRencontres);
			$scope.prenomAProposer = $window._.uniq($scope.prenomAProposer);

			// Proposition d'un nouveau prénoms
			$scope.chargerLePrenomAProposerSuivant();
		};

		$scope.$watch('sexe', $scope.reinitialiserSystemePropositionPrenom);

		if(typeof($window.Storage) === 'undefined') {
			$window.alert('Pas compatible local storage. Votre tri sera perdu au rechargement de la page. N\'oubliez pas d\'exporter !');
		}

		$scope.reinitialiserSystemePropositionPrenom();

	}])

.factory('donneMoiDesPrenoms', ['$window', function($window) {
	return function(sexe) {			
				var tousLesPrenomsFilles = ['Abella','Ada','Adelaide','Adele','Adeline','Adnette','Adrienne','Agathe','Aglaee','Agnes','Aimee','Albane','Albe','Alberta','Alberte','Albertine','Alda','Alette','Alex','Alexandra','Alexandrie','Alexane','Alexia','Alice','Alida','Aline','Alison','Alix','Alizee','Allison','Alphonsine','Amanda','Amandine','Amarante','Ambre','Ambroise','Amelie','Anais','Anastasie','Andree','Angele','Angeline','Angelique','Anna','Annabelle','Annaelle','Anne','Anneliese','Annette','Annick','Annie','Annonciade','Anouchka','Anouck','Antoinette','Apolline','Aquiline','Ariane','Arianne','Aricie','Arielle','Arlette','Armance','Armande','Armel','Armela','Armelle','Arnaude','Ashley','Astrid','Aude','Audrey','Augusta','Augustine','Aure','Aurelie','Auriane','Aurianne','Aurore','Axelle','Babette','Babine','Barbara','Barbe','Barberine','Beatrice','Benedicte','Benjamine','Benoîte','Berengere','Berenice','Bernadette','Bernardine','Berthe','Bertille','Bettina','Betty','Bienvenue','Blanca','Blanche','Blandine','Bluette','Brigitte','Camille','Candice','Candy','Capucine','Carine','Carmen','Carmine','Carole','Caroline','Cassandra','Catherine','Cathy','Cecile','Celeste','Célestine','Celia','Celine','Cerise','Cesarine','Chantal','Charlette','Charley','Charline','Charlotte','Chloe','Christel','Christelle','Christiane','Christianne','Christine','Claire','Clara','Clarence','Clarice','Clarisse','Claude','Claudette','Claudia','Claudine','Clea','Clelia','Clemence','Clementine','Clothilde','Clotilde','Colette','Colombe','Constance','Cora','Coralie','Corinna','Corinne','Cosette','Cunégonde','Cyrille','Dahlia','Daisy','Daniele','Danielle','Danitza','Danny','Daphnee','Daria','Deborah','Delphine','Denise','Désirée','Diane','Dianne','Dolores','Dominique','Domitille','Donatienne','Dora','Doriane','Dorine','Doris','Dorothee','Edith','Edma','Edmee','Edouardine','Edwige','Eleonore','Elfi','Eliane','Eliette','Eline','Elisabeth','Elise','Elisee','Ella','Ellenita','Elodie','Éloise','Elsa','Elsy','Elvire','Elysée','Emeline','Emilie','Emilienne','Emma','Emmanuelle','Erika','Ernestine','Esperance','Estelle','Esther','Eugenie','Eulalie','Eurielle','Eva','Eve','Evelyne','Fabienne','Fabiola','Fanchon','Fanny','Faustine','Felicie','Félicienne','Felicite','Fernande','Fiona','Flamine','Flavie','Fleur','Flora','Flore','Florence','Florette','Florianne','Franceline','Francette','Francine','Francis','Francoise','Frankie','Frederique','Frida','Gabrielle','Gaelle','Gaetane','Genevieve','Georgette','Georgine','Geraldine','Germaine','Geronima','Gertrude','Gervaise','Ghislaine','Gigi','Gilberte','Gina','Ginette','Gisele','Giselle','Godeliève','Grace','Gracieuse','Guennole','Guillemette','Gwenael','Gwenaelle','Gwendoline','Gwenola','Gwladys','Hannah','Hedwige','Helena','Helene','Heliena','Héloïse','Helyette','Henriette','Hermance','Hermine','Hilda','Hippolyte','Honorine','Hortense','Huguette','Hyacinthe','Iadine','Ida','Ilona','Ilse','Ines','Ingrid','Irene','Irenee','Iris','Irma','Isabeau','Isabel','Isabelle','Isaie','Isaline','Ivana','Jacinthe','Jackie','Jacqueline','Jacquette','Jacquine','Jacquotte','Jane','Jasmine','Jeanine','Jeanne','Jeannette','Jeannine','Jenny','Jessica','Joceline','Jocelyne','Joelle','Johanne','Jordanne','Josée','Josèphe','Josephine','Josette','Josiane','Josseline','Juanita','Jude','Judith','Juliane','Julianne','Julie','Julienne','Juliette','Justine','Karelle','Karen','Karina','Karine','Kassandra','Katel','Katia','Katy','Ketty','Laetitia','Lara','Larissa','Laura','Lauranne','Laure','Laurence','Laurentine','Laurette','Lauriane','Laurie','Lea','Leandre','Lelia','Lena','Leone','Leonie','Leonilde','Leonore','Leontine','Leslie','Lia','Liane','Lidwine','Lila','Lilian','Liliane','Lily','Linda','Line','Lisa','Lisbeth','Lise','Lisette','Lizzie','Logan','Lois','Lola','Lolita','Loraine','Lore','Louise','Luana','Luce','Lucette','Lucie','Lucienne','Lucile','Lucille','Lucinde','Lucrece','Ludmilla','Lydia','Lydiane','Lydie','Lynda','Macrine','Maddy','Madeleine','Madeline','Maelle','Maeva','Magali','Magalie','Magaly','Maggy','Maite','Manon','Marceline','Marcelle','Marcelline','Margaux','Margot','Marguerite','Maria','Mariam','Marianne','Marie','Marie-Eve','Marie-France','Marie-Josee','Marie-Line','Marie-Madeleine','Marielle','Mariette','Marika','Marilyne','Marina','Marine','Marinette','Marion','Marise','Marissa','Marjolaine','Marjorie','Marlene','Marthe','Martine','Mary','Maryline','Maryse','Maryvonne','Mathilde','Maud','Maude','Mauricette','Maximilienne','Maylis','Megan','Melaine','Melanie','Melissa','Melodie','Melyna','Meredith','Meryl','Michele','Micheline','Michelle','Mildred','Milene','Mirabelle','Mireille','Miriam','Modestine','Monica','Monique','Morgaine','Morgane','Muguet','Muguette','Muriel','Murielle','Mylene','Myriam','Myrtille','Nadege','Nadette','Nadia','Nadine','Nancy','Narcisse','Natacha','Natalie','Natalya','Nathalie','Nathanaelle','Nelly','Nicole','Nicoletta','Nicolette','Nina','Ninette','Ninon','Noeline','Noella','Noelle','Noemie','Nolwenn','Nora','Oceane','Octavie','Odette','Odile','Odilon','Olga','Olive','Olivette','Olivia','Olympe','Ombeline','Ophelie','Oriane','Orianne','Pamela','Paola','Paquerette','Paquita','Pascale','Pascaline','Patricia','Paula','Paule','Paulette','Pauline','Peggy','Pelagie','Pénélope','Perlette','Pernelle','Peroline','Perrette','Perrine','Pervenche','Philiberte','Philippine','Pierrette','Placide','Prisca','Priscille','Prudence','Quitterie','Rachel','Radegonde','Raissa','Raphaelle','Raymonde','Rebecca','Regine','Reine','Rejane','Renee','Rita','Roberte','Robin','Rochelle','Rolande','Rosalie','Rosana','Rose','Roseline','Roselle','Roselyne','Rosemonde','Rosette','Rosine','Rosita','Rosy','Roxane','Roxanne','Rozenn','Sabine','Sabrina','Sacha','Salomé','Sandie','Sandra','Sandrine','Sandy','Sara','Sarah','Sébastienne','Segolene','Selma','Séraphine','Sergine','Servane','Severine','Sheila','Sibille','Sibylle','Sidoine','Sidonie','Sigolene','Simone','Sofia','Soizic','Solange','Soledad','Solenne','Soline','Sonia','Sophie','Stella','Stephanie','Suzanne','Suzel','Suzette','Suzon','Suzy','Svetlana','Sybil','Sybille','Sylvaine','Sylvette','Sylvia','Sylviane','Sylvianne','Sylvie','Tabatha','Tamara','Tania','Tara','Tatiana','Tatienne','Teresa','Tessa','Theophane','Therese','Tiphaine','Toinette','Toussainte','Urielle','Ursula','Ursule','Valentine','Valerie','Vanessa','Vanina','Vera','Verane','Veronique','Vickie','Victoire','Victorine','Vinciane','Violaine','Violette','Virginie','Viridiana','Viviane','Vivien','Vivienne','Weena','Wendy','Xaviere','Yanick','Yannic','Yannick','Yolaine','Yolande','Ysaline','Yvette','Yvonne','Zelie','Zéphyrine','Zita','Zoe'];
				var tousLesPrenomsGarcons = ['Abel','Abraham','Achille','Adam','Adelphe','Adolphe','Adrien','Aime','Aimee','Alain','Alban','Alberic','Albert','Albin','Aldo','Alex','Alexandre','Alexis','Alfred','Alison','Alix','Alois','Alphonse','Amael','Amalric','Amand','Amaury','Ambroise','Ame','Amedee','Amos','Amour','Anatole','Andoche','Andre','Andrea','Anicet','Anselme','Anthelme','Anthony','Antoine','Antonin','Antony','Apollinaire','Apollos','Arcadius','Arcady','Archibald','Aristide','Armand','Armel','Arnaud','Arnold','Arnould','Arsene','Arthur','Ashley','Athanase','Aubert','Aubin','Auguste','Augustin','Augustine','Aurele','Aurelien','Avit','Axel','Aymar','Aymeric','Banard','Baptiste','Barnabe','Barnard','Barthelemy','Bartolome','Basile','Bastien','Baudoin','Baudouin','Benjamin','Benoît','Benoit-Joseph','Berenger','Bernard','Bernardin','Bertin','Bertrand','Billy','Blaise','Bonaventure','Boniface','Boris','Briac','Brice','Brieuc','Bruno','Calvin','Camille','Carl','Carlos','Carmine','Casimir','Cedric','Celeste','Celestin','Célestine','Césaire','Cesar','Charles','Charley','Charlot','Charly','Christian','Christophe','Clarence','Claude','Claudius','Clement','Clet','Clovis','Colin','Colombe','COme','Conrad','Constant','Constantin','Corentin','Corin','Corneille','Crépin','Cyprien','Cyriaque','Cyrille','Damien','Daniel','Daniele','Danny','Darius','David','Davy','Delphin','Denis','Dennis','Desire','Didier','Diego','Dietrich','Dieudonne','Dimitri','Dion','Dirk','Dominique','Domnin','Donald','Donat','Donatien','Donovan','Dorian','Dylan','Edgar','Edgard','Edmond','Edouard','Eleazar','Elfried','Elia','Elie','Eloi','Elphege','Emeric','Emile','Emilien','Emilio','Emmanuel','Enguerran','Enrique','Ephrem','Eric','Erich','Ernest','Erwan','Erwin','Etienne','Eudes','Eugene','Eusebe','Eustache','Evan','Evariste','Evrard','Eymard','Fabien','Fabrice','Faustin','Felicien','Felix','Ferdinand','Fernand','Ferreol','Fiacre','Fidele','Firmin','Flavien','Florence','Florent','Florentin','Florian','Fortunat','France','Francelin','Francis','Francisque','Franck','Francois','Francois Xavier','Francois-Xavier','Frankie','Franklin','Freddy','Frederic','Fulbert','Gabin','Gabriel','Gael','Gaetan','Gall','Garry','Gaspard','Gaston','Gatien','Gaud','Gautier','Gelase','Genn','Geoffrey','Geoffroy','Georges','Gerald','Gerard','Geraud','Germain','Gervais','Gery','Ghislain','Gilbert','Gildas','Gilles','Gino','Giraud','Godefroy','Godeliève','Gontran','Gonzague','Goulven','Gratien','Gregoire','Gregory','Guénole','Guewen','Guillaume','Guillem','Gustave','Guy','Gwenael','Habib','Hadrien','Hans','Harold','Harry','Hector','Henri','Herbert','Hercule','Hermann','Hermes','Herve','Hilaire','Hippolyte','Honorat','Honore','Horace','Hubert','Hugo','Hugues','Humbert','Ignace','Igor','Imre','Innocent','Innocents','Irene','Isaac','Isidore','Ivan','Jackie','Jacob','Jacques','James','Jaouen','Jarod','Jason','Jean','Jean-Baptiste','Jean-Francois','Jean-Marie','Jeannot','Jeremie','JerOme','Jim','Joachim','Joachin','Joel','Joevin','John','Johnatan','Johnny','Joris','Jose','Joseph','Josselin','Josue','Jourdain','Jude','Judicael','Jules','Julien','Juste','Justin','Juvenal','Kevin','Killian','Kurt','Lambert','Landry','Laurent','Lazare','Leandre','Leger','Leo','Leon','Leonard','Leonce','Leone','Leopold','Leslie','Lilian','Lionel','Logan','Loic','Lois','Lothaire','Louis','Louis-Marie','Loup','Luc','Lucas','Lucien','Ludovic','Ludwig','Magloire','Malo','Manoel','Manuel','Marc','Marceau','Marcel','Marcellin','Marcien','Marien','Marin','Mario','Marius','Martial','Martin','Martinien','Mateo','Materne','Mathias','Mathieu','Mathis','Mathurin','Matthias','Matthieu','Maurice','Maxime','Maximilien','Maximin','Mayeul','Medard','Melvin','Meredith','Meriadec','Michael','Michel','Michele','Miguel','Mikael','Mike','Mildred','Milo','Miloud','Modeste','Modestine','Moise','Mortimer','Morvan','Moshe','Nahum','Narcisse','Nathan','Nazaire','Neil','Nello','Nestor','Nicholas','Nicolas','Nikita','Noe','Noel','Norbert','Octave','Octavien','Odilon','Olive','Olivier','Omer','Onésime','Oscar','Oswald','Otmar','Pablo','Paco','PacOme','Paquito','Parfait','Pascal','Paschal','Paterne','Patrice','Patrick','Paul','Paulin','Perry','Peter','Philbert','Philibert','Philippe','Pierre','Pierrick','Pietro','Placide','Pol','Prisca','Privat','Prosper','Quentin','Rainier','Ralph','Raoul','Raphael','Raymond','Reginald','Regis','Regnault','Remi','Rémy','Renald','Renaud','Renauld','Rene','Richard','Robert','Robin','Roch','Rodolph','Rodolphe','Rodrigue','Rogatien','Roger','Roland','Romain','Roman','Romaric','Romeo','Romuald','Ronald','Ronan','Roparz','Rudy','Ruffin','Sacha','Salomon','Salvatore','Samson','Samuel','Samy','Sandy','Saturnin','Sebastien','Seraphin','Serge','Servan','Severin','Sévrin','Sidoine','Siegfried','Silvere','Simeon','Simon','Stanislas','Stéphane','Steve','Sylvain','Sylvestre','Symphorien','Tanguy','Teddy','Thaddee','Thecle','Théo','Theodore','Theophile','Thibaud','Thibault','Thiebaud','Thierry','Thomas','Timothee','Tino','Titouan','Toussaint','Tristan','Tudal','Ugo','Ulrich','Urbain','Valentin','Valere','Valery','Vassili','Venceslas','Vianney','Victor','Victorien','Vincent','Virgile','Vital','Vivien','Vladimir','Walter','Wenceslas','Werner','Wesley','Wilfried','William','Willy','Winnoc','Wladimir','Wolfgang','Wulfran','Xavier','Yanick','Yann','Yannic','Yannick','Youri','Yvan','Yves','Yvon','Zacharie','Zephirin'];

				var prenomsARetourner = (sexe === 'FILLE') ? tousLesPrenomsFilles : (sexe === 'GARCON') ? tousLesPrenomsGarcons : tousLesPrenomsFilles.concat(tousLesPrenomsGarcons);

				return $window._.shuffle(prenomsARetourner);
			};
		}
	])
;
