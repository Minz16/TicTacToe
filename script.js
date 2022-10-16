const brett = document.getElementById("brett");
const feld = document.getElementsByClassName("feld");
const screen = document.getElementById("screen");
const text = document.getElementById("text");
const inhalt = document.getElementsByClassName("inhalt");
const taste = document.getElementById("reset");
const alles = document.getElementById("front");
const body = document.getElementsByTagName("body");
const punkte = document.getElementsByClassName("punkte");

//[1, 2, 3]
//[4, 5, 6]
//[7, 8, 9]
const win = [
//links rechts
[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
//oben unten
[1, 4, 7],
[2, 5, 8],
[3, 6, 9],
//schräge
[1, 5, 9],
[3, 5, 7],
];

function startup(){
    taste.style.display="none";
}
startup()


function reset () {
    for (let i=0; i<=8; i++) {
        feld[i].setAttribute("onclick", "game("+ (i+1)+ ")")
        feld[i].setAttribute("onmouseover", "hover("+ (i+1)+ ")")
        feld[i].setAttribute("onmouseout", "hover("+ (i+11)+ ")")
        inhalt[i].setAttribute("class", "inhalt")
    }
    karteX = []
    karteG = []
    kartevoll = []
    zug = true;
    text.innerHTML="";




    alles.style.display="";
    screen.style.height="0";
    screen.style.width="0";
    body[0].style.margin="30% 0 0 0";
    body[0].style.backgroundColor="#333333";
    taste.style.display="none";
}

function compare(x, y) {
    //console.log(win[1].indexOf(1));
    //console.log(x)
    var k=0;
    var Sieger=false;
    for(let et in win) {
        //console.log(et)
        k=0;
        for (let num of x) {
            //console.log(num)
            //console.log("INdex " + x.indexOf(num))
            if (win[et].includes(num)) {
                //console.log("true")
                k++;
            };
        };
        if (k==3) {
            Sieger=true;
        }
    };
    if (Sieger) {
        ende(y);
    };
}

//Siegespunkte
var sX=0;
var sG=0;

function ende (ergeb) {
    for (let i=0; i<=8; i++) {
        feld[i].setAttribute("onclick", "")
    }
    alles.style.display="none";
    screen.style.height="100%";
    screen.style.width="100vw";
    body[0].style.margin="0";
    body[0].style.backgroundColor="hsl(0, 0%, 20%)";
    taste.style.display="flex";


    if (ergeb == "x") {
        sX++;
        punkte[0].innerHTML=sX
        text.innerHTML="X hat Gewonnen!"
    } else if (ergeb == "g") {
        sG++;
        punkte[1].innerHTML=sG
        text.innerHTML="Kreis hat Gewonnen!"
    } else if (ergeb == "tie") {
    text.innerHTML="Unentschieden!"
    }
}





//Die besetzen Felder
var karteX = []
var karteG = []
var kartevoll = []

var zug = true;

function game(x){
    if (zug) {
        feld[x-1].setAttribute("onclick", "")
        feld[x-1].setAttribute("onmouseover", "")
        feld[x-1].setAttribute("onmouseout", "")
        inhalt[x-1].setAttribute("class", "inhalt kreuz")
        karteX.push(x);
        compare(karteX, "x");
        zug = false;
    } else {
        feld[x-1].setAttribute("onclick", "")
        feld[x-1].setAttribute("onmouseover", "")
        feld[x-1].setAttribute("onmouseout", "")
        inhalt[x-1].setAttribute("class", "inhalt kreis")
        karteG.push(x);
        compare(karteG, "g")
        zug = true;
    }
    kartevoll.push(x);
    //console.log(kartevoll);
    //console.log(kartevoll.length)

    if (kartevoll.length == 9) {
        ende("tie");
        //console.log("X ist " + karteX);
        //console.log("G ist " + karteG);
    }
}

function hover(x) {
    if (x<=10) {
        //feld[x-1].style.backgroundColor="red";
        //inhalt[x-1].setAttribute("class", "inhalt graukreuz")
        if (zug) {
            inhalt[x-1].setAttribute("class", "inhalt graukreuz")
        } else {
            inhalt[x-1].setAttribute("class", "inhalt graukreis")
        };
    } else {
        //feld[x-11].style.backgroundColor="";
        inhalt[x-11].setAttribute("class", "inhalt")
    }
}

var togglepunkte = true;
var weg = 0;
const anzeige = () => {
    weg++;
    if (weg==2) {
        weg=0;
        console.log("Aktueller Stand lautet, X: ${sX} O: ${sG}");
        sX=0;
        sG=0;
        punkte[0].innerHTML=sX
        punkte[1].innerHTML=sG
    }
    if (togglepunkte) {
        punkte[0].style.display="flex";
        punkte[1].style.display="flex";
        togglepunkte=false;
    } else {
        punkte[0].style.display="none";
        punkte[1].style.display="none";
        togglepunkte=true;
    }
};