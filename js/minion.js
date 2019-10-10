//Starter med at lave nogle variabler

//Sneglene laves som 'objekter', dsv flere properties/egneskaber
var minion1 = {
    id: "a",
    navn: "Minion 1",
    foto: "images/minion1.png",
    x: -160,
    y:-40
};

var minion2 = {
    id: "b",
    navn: "Minion 2",
    foto: "images/minion2.png",
    x: -160,
    y:80
};



var sek = 0;
var minSpring = 3; 
var maxSpring = 15;
var tidsinterval = 100; 
var finishLine = 730;


window.onload = function () {
    //Finder frem til div'en 'raceway' i HTML-dokumentet, for heri skal sneglene indsættes
    var miniontrack = document.getElementById("minionway");

    //Opretter ny div i raceway-div'en med minion1's properties.
    var m1 = document.createElement("div");
    m1.id = minion1.id;
    m1.className = "minion-container";
    m1.style.backgroundImage = "url('"+ this.minion1.foto + "')"
    m1.style.top = minion1.y + "px";
    m1.style.left = minion1.x + "px";
    miniontrack.appendChild(m1);

    //Opretter ny div i raceway-div'en med minion2's properties.
    var m2 = document.createElement("div");
    m2.id = minion2.id;
    m2.className = "minion-container";
    m2.style.backgroundImage = "url('"+ minion2.foto + "')";
    m2.style.top = minion2.y + "px";
    m2.style.left = minion2.x + "px";
    miniontrack.appendChild(m2);

}

//overskrift
var overskr = document.getElementById("overskrift");
var sk = document.getElementById("startknap");

//Lyt efter et "click" og gør noget
sk.addEventListener("click", StyleOverskr);

function StyleOverskr(){

    overskr.innerText = "Poi spiller lige nu";
    overskr.style.cssText= "color:black";
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
    minion1.x += spring();
    minion2.x += spring();

    //Sneglene flyttes til den nye position i x-aksen
    document.getElementById(minion1.id).style.left = minion1.x + "px";
    document.getElementById(minion2.id).style.left = minion2.x + "px";

    //Spillet slutter når en eller begge snegle når i mål. Målet er angivet med variablen 'finishLine'
    if (minion1.x >= finishLine ||  minion2.x >= finishLine ) {

        //Finder ud af hvem vinderen er, ved at sammenligne deres positioner;
        if (minion1.x > minion2.x) {
            setTimeout("winner ('" + minion1.navn +  "');", 1000); //Vinderen er snegl1
        }
        else if ( minion2.x > minion1.x){
            setTimeout("winner ('" + minion2.navn +  "');", 1000); //Vinderen er snegl2
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

        alert("Ræset er slut - det blev uafgjort! Det tog " + tid + " sekunder.");
    }
    else {

        alert("Ræset blev vundet af " + vinderen + "! Det tog " + tid + " sekunder.");
    }
    window.location.reload(); //Genindlæser siden og dermed spillet
};

//En funktion der returnerer et tilfældigt tal. Min - og max er angivet i starten af .js filen.
function spring() {

    var randomStep = Math.round(Math.random() * maxSpring) + minSpring;
    return randomStep;
};