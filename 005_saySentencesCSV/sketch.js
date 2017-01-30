var tableau;
var tab_categorie = [];
var tab_mot_cle0 = [];
var tab_mot_cle1 = [];
var tab_mot_cle2 = [];
var tab_mot_cle3 = [];
var tab_intensite = [];
var tab_phrase = [];
var next = 2;

var mots_cle = [];
var subjects = [];
var subject;
var currentPhrase;

var intensite = 0;
var gestures = [];
var compliments = [];
var conversations = [];
var lies = [];
var sobriquets = [];
var texte = document.getElementById('texte');

var nbTouch = 0;

var changeSubject = true;



var touched = 0;

function preload() {
  tableau = loadTable("assets/phrases5.csv", "csv", "header");
}


function reset() {
	isStartFinished = false;
	isFinished = false;
	counter = 0;

	tab_categorie = [];
	tab_mot_cle0 = [];
	tab_mot_cle1 = [];
	tab_mot_cle2 = [];
	tab_mot_cle3 = [];
	tab_intensite = [];
	tab_phrase = [];
	next = 2;

	mots_cle = [];
	subjects = [];
	subject;
	currentPhrase;

	intensite = 0;
	gestures = [];
	compliments = [];
	conversations = [];
	lies = [];
	sobriquets = [];
	texte = document.getElementById('texte');

	nbTouch = 0;
	changeSubject = true;
	var touched = 0;

  makeSubjectsList();
  makeGesturesList();

}


function setup() {

  createCanvas(windowWidth, windowHeight);

// récupère les données du fichier
  for (var rangee = 0; rangee < tableau.getRowCount(); rangee++) {
  	tab_categorie[rangee] = tableau.getString(rangee, 0);
  	tab_mot_cle0[rangee] = tableau.getString(rangee, 1);
  	tab_mot_cle1[rangee] = tableau.getString(rangee, 2);
  	tab_mot_cle2[rangee] = tableau.getString(rangee, 3);
  	tab_mot_cle3[rangee] = tableau.getString(rangee, 4);
  	tab_intensite[rangee] = tableau.getString(rangee, 5);
  	tab_phrase[rangee] = tableau.getString(rangee, 6);
  }

  makeSubjectsList();
  makeGesturesList();

  // createInterface();

}



// Fait les listes de phrases en fonction des catégories
function makeGesturesList() {
	// Gestures list
	for (var i=0; i<tableau.getRowCount(); i++) {
		if(tab_categorie[i] == "action") {
			gestures.push(tab_phrase[i]);
		}
	}

	// Compliments list
	for (var i=0; i<tableau.getRowCount(); i++) {
		if(tab_categorie[i] == "compliment") {
			compliments.push(tab_phrase[i]);
		}
	}

	// Conversations list
	for (var i=0; i<tableau.getRowCount(); i++) {
		if(tab_categorie[i] == "conversation") {
			conversations.push(tab_phrase[i]);
		}
	}

	// Lies list
	for (var i=0; i<tableau.getRowCount(); i++) {
		if(tab_categorie[i] == "mensonge") {
			lies.push(tab_phrase[i]);
		}
	}

	// Sobriquets list
	for (var i=0; i<tableau.getRowCount(); i++) {
		if(tab_categorie[i] == "sobriquet") {
			sobriquets.push(tab_phrase[i]);
		}
	}

	//print("compliments " + compliments.length + " convers " + conversations.length + " mensonge " + lies.length);

}

function draw() {

	if (nbTouch>50) {
		isFinished = true;
	}


}




function choisi() {

	// if (responsiveVoice.isPlaying() == false) {

	var dice = int(random(15));

	if (dice <= 1) {
		sayGesture();
	} else if (dice > 1 && dice <= 4) {
		say(compliments);
	} else if(dice > 4 && dice <=8)  {
		say(conversations);
	} else {
		say(lies);
	}

	for (var i=0; i<tableau.getRowCount(); i++) {
		if(tab_intensite[i]>=intensite) {

		}
	}

	next++;

	nbTouch++;
	// print("choisi");

	// } else if(responsiveVoice.isPlaying()) {
	// 	counter++;
	// 	if (counter >5) {
	// 		 responsiveVoice.cancel();
	// 		 counter = 0;
	// 	}
	// }



}



function sayGesture() {
	var index = int(random(gestures.length));
	var gesture = gestures[index];
	texte.innerHTML = gesture;
	gestures.splice(index, 1);
}



function say(listType) {
	
	var temporaryList = [];


	for (var h=0; h<listType.length; h++) {

		for (var i=0; i<tableau.getRowCount(); i++) {

	// si la phrase est dans la liste des compliments
	// et que l'un des mots clés est égal au sujet
			if (listType[h] == tab_phrase[i] &&
				(subject == tab_mot_cle0[i] ||
				subject == tab_mot_cle1[i] ||
				subject == tab_mot_cle2[i] ||
				subject == tab_mot_cle3[i])) 
				{
					temporaryList.push(listType[h]);
				}
		}
	}

	// Si aucun mot clé ne correspond au sujet, choisi un autre sujet
	// Sinon display une phrase parmi les phrases possibles
	if (temporaryList.length == 0) {
		chooseSubject(listType, currentPhrase);
	} else {

		var index = int(random(temporaryList.length));
		currentPhrase = temporaryList[index];
		// print(sobriquets);
		// print("sobriquet " + sobriquets[0]);

		// si la phrase contient un [sobriquet]
		// if (currentPhrase.search(/sobriquet/) != -1) {
		// 	// print("sobriquet found " + currentPhrase);
		// 	currentPhrase.replace('sobriquet', "dfshfhsdkjfdskjfhdksfhdshfjkdshfjkdshffffj");

		// 	//sobriquets[int(random(sobriquets.length))]
		// }

		texte.innerHTML = currentPhrase;
		for (var j=0; j<listType.length; j++) {
			if (listType[j] == currentPhrase) {
				listType.splice(j, 1);
			}		
		}

	}

	//print(subject);

}


function chooseSubject(listType, currentPhrase) {

	var index = 300;

	// Prend la dernière phrase, cherche cette phrase dans la liste originale et regarde ses mots clés
	// Si l'un des mots clés est dans la subjects liste, choisi-le comme subject
		for (var i=0; i<tableau.getRowCount(); i++) {
			if (currentPhrase == tab_phrase[i]) {
				for(var j=0; j<subjects.length; j++) {
					if(subjects[j] == tab_mot_cle0[i]) {
						index = j;
						break;
					} else if (subjects[j] == tab_mot_cle1[i]) {
						index = j;
						break;
					} else if (subjects[j] == tab_mot_cle2[i]) {
						index = j;
						break;
					} else if (subjects[j] == tab_mot_cle3[i]) {
						index = j;
						break;
					} 
				}
			}
		}

	// si aucun des mots clés de la dernière phrase n'est trouvé dans la liste, choisi un sujet au hasard
	if (index == 300) {
		index = int(random(subjects.length));
	}
		
		subject = subjects[index];

		var stillInTheList = false;

	// Vérifie si le sujet est encore associé à une des phrases dans la liste des compliments, ou la liste des conversations ou 
	// la liste des mensonges
		for (var k=0; k<compliments.length; k++) {
			for(var kBis=0; kBis<tableau.getRowCount(); kBis++) {
				if (compliments[k] == tab_phrase[kBis]) {
					if (subject == tab_mot_cle0[kBis] ||
						subject == tab_mot_cle1[kBis] ||
						subject == tab_mot_cle2[kBis] ||
						subject == tab_mot_cle3[kBis]) {
			
						stillInTheList = true;
						break;
					}
				}
			}
		}


	if (stillInTheList == false) {
		for (var l=0; l<conversations.length; l++) {
			for(var lBis=0; lBis<tableau.getRowCount(); lBis++) {
				if (conversations[l] == tab_phrase[lBis]) {
					if (subject == tab_mot_cle0[lBis] ||
						subject == tab_mot_cle1[lBis] ||
						subject == tab_mot_cle2[lBis] ||
						subject == tab_mot_cle3[lBis]) {
			
						stillInTheList = true;
						break;
					}
				}
			}
		}
	}

	if (stillInTheList == false) {
		for (var m=0; m<lies.length; m++) {
			for(var mBis=0; mBis<tableau.getRowCount(); mBis++) {
				if (lies[m] == tab_phrase[mBis]) {
					if (subject == tab_mot_cle0[mBis] ||
						subject == tab_mot_cle1[mBis] ||
						subject == tab_mot_cle2[mBis] ||
						subject == tab_mot_cle3[mBis]) {
				
						stillInTheList = true;
						break;
					}
				}
			}
		}
	}

		// if(stillInTheList == false) {
			subjects.splice(index, 1);
		// }
		


		say(listType);

}



function makeSubjectsList() {

	//récupère tous les mots-cles des 4 colonnes
	for (var h=0; h<tab_mot_cle0.length; h++) {
		mots_cle.push(tab_mot_cle0[h]);
		mots_cle.push(tab_mot_cle1[h]);
		mots_cle.push(tab_mot_cle2[h]);
		mots_cle.push(tab_mot_cle3[h]);
	}

	var alreadyIn = false;

	for(var i=0; i<mots_cle.length; i++) {
		for (var j=0; j<subjects.length; j++) {
			// check si un mot clé est déjà dans la liste ou s'il est vide
			if (mots_cle[i] == subjects[j] || mots_cle[i] == '') {
				alreadyIn = true;
			}
		}
		
		// si le mot clé n'est pas dans la liste on l'ajoute, sinon on ne l'ajoute pas
		if (alreadyIn == false) {
			subjects.push(mots_cle[i]);
		} else {
			alreadyIn = false;
		}

	}

}


function calcIntensity() {
	if(next == 10) {
		intensite++;
	} else if (next == 20) {
		intensite++;
	} else if (next == 40) {
		intensite++;
	} else if (next == 56) {
		intensite++;
	} else if (next == 72) {
		intensite++;
	}
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



var isItTouching = false;

