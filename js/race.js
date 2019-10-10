//Starter med at lave nogle variabler

//Sneglene laves som 'objekter', dsv flere properties/egneskaber
var snegl1 = {
    id: "a",
    navn: "Snegl 1",
    foto: "images/snegl1.png",
    x: -160,
    y:-40
};

var snegl2 = {
    id: "b",
    navn: "Snegl 2",
    foto: "images/snegl2.png",
    x: -160,
    y:40
};


var sek = 0;
var minSpring = 3; 
var maxSpring = 15;
var tidsinterval = 100; 
var finishLine = 730;


window.onload = function () {
    //Finder frem til div'en 'raceway' i HTML-dokumentet, for heri skal sneglene indsættes
    var racetrack = document.getElementById("raceway");

    //Opretter ny div i raceway-div'en med snegl1's properties.
    var s1 = document.createElement("div");
    s1.id = snegl1.id;
    s1.className = "snegle-container";
    s1.style.backgroundImage = "url('"+ snegl1.foto + "')";
    s1.style.top = snegl1.y + "px";
    s1.style.left = snegl1.x + "px";
    racetrack.appendChild(s1);

    //Opretter ny div i raceway-div'en med snegl2's properties.
    var s2 = document.createElement("div");
    s2.id = snegl2.id;
    s2.className = "snegle-container";
    s2.style.backgroundImage = "url('"+ snegl2.foto + "')";
    s2.style.top = snegl2.y + "px";
    s2.style.left = snegl2.x + "px";
    racetrack.appendChild(s2);
}

//Funktionene der starter løbet. Aktiveres ved klik på knappen 'startknap
function start() {
    document.getElementById('startknap').style.display = "none"; //Skjuler start-knappen
    afsted();                                                   //Kalder funktionn der starter ræset
}

//Funktion der får sneglene til at 'løbe' (eller snegle sig afsted)..
function afsted () {

    //Ny position bestemmes
    //Sneglenes nuværende x-position øges med et tilfældig tal som laves i funktionen 'spring()'
    snegl1.x += spring();
    snegl2.x += spring();

    //Sneglene flyttes til den nye position i x-aksen
    document.getElementById(snegl1.id).style.left = snegl1.x + "px";
    document.getElementById(snegl2.id).style.left = snegl2.x + "px";

    //Spillet slutter når en eller begge snegle når i mål. Målet er angivet med variablen 'finishLine'
    if (snegl1.x >= finishLine ||  snegl2.x >= finishLine ) {

        //Finder ud af hvem vinderen er, ved at sammenligne deres positioner;
        if (snegl1.x > snegl2.x) {
            setTimeout("winner ('" + snegl1.navn +  "');", 1000); //Vinderen er snegl1
        }
        else if ( snegl2.x > snegl1.x){
            setTimeout("winner ('" + snegl2.navn +  "');", 1000); //Vinderen er snegl2
        }
        else {
            setTimeout("winner ('');", 1000); //Begge løbere kom i mål samtidig - ingen vinder.
        }
    }
    else {
        setTimeout ("afsted();", tidsinterval); //INgen løberer har nået målet endnu, og hele funktion afvikles påny
        sek = sek + 1; //Sekundtælleren tæller op.
    }

};


//Funktion der kårer vinderen
function winner (vinderen) {

    var tid = (sek * tidsinterval) /1000; //Brugner hvor lang tid løbet tog. Intervallet imellem hvert 'spring' regnes med

    if (vinderen == "") {

        alert("Ræset er slut - det blev uafgjort! Det tog" + tid + "sekunder.");
    }
    else {

        alert("Ræset blev vundet af" + vinderen + "! Det tog" + tid + "sekunder.");
    }
    window.location.reload(); //Genindlæser siden og dermed spillet
};

//En funktion der returnerer et tilfældigt tal. Min - og max er angivet i starten af .js filen.
function spring() {

    var randomStep = Math.round(Math.random() * maxSpring) + minSpring;
    return randomStep;
};