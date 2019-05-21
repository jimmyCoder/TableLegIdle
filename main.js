var tableLegs = 0;
var incLegCount = 0;
function tableLegClick(number){
    tableLegs = tableLegs + number+incLegCount;
    document.getElementById("tableLegs").innerHTML = tableLegs;
};

function autoClick(number){
    tableLegs = tableLegs + number;
    document.getElementById("tableLegs").innerHTML = tableLegs;
};

var apprentices = 0;

function buyApprentice(){
    var apprenticeCost = Math.floor(10 * Math.pow(1.1,apprentices));     //works out the cost of this apprentice
    if(tableLegs >= apprenticeCost){                                   //checks that the player can afford the apprentice
        apprentices = apprentices + 1;                                   //increases number of apprentices
    	tableLegs = tableLegs - apprenticeCost;                          //removes the tableLegs spent
        document.getElementById('apprentices').innerHTML = apprentices;  //updates the number of apprentices for the user
        document.getElementById('tableLegs').innerHTML = tableLegs;  //updates the number of tableLegs for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,apprentices));       //works out the cost of the next apprentice
    document.getElementById('apprenticeCost').innerHTML = nextCost;  //updates the apprentice cost for the user

};

var jrApprentices = 0;

function promoteApprentice(){
    var jrApprenticeCost = Math.floor(250 * Math.pow(1.1,jrApprentices));     //works out the cost of this apprentice
    if(tableLegs >= jrApprenticeCost && jrApprentices < apprentices){                                   //checks that the player can afford the apprentice
        jrApprentices = jrApprentices + 1;                                   //increases number of apprentices
    	tableLegs = tableLegs - jrApprenticeCost;                          //removes the tableLegs spent
        document.getElementById('jrApprentices').innerHTML = jrApprentices;  //updates the number of apprentices for the user
        document.getElementById('tableLegs').innerHTML = tableLegs;  //updates the number of tableLegs for the user
    };
    var nextCost = Math.floor(250 * Math.pow(1.1,jrApprentices));       //works out the cost of the next apprentice
    document.getElementById('jrApprenticeCost').innerHTML = nextCost;  //updates the apprentice cost for the user

};

var hammers = 0;
function buyHammer(){
    var hammerCost = Math.floor(10 * Math.pow(1.1,hammers));     //works out the cost of this apprentice
    if(tableLegs >= hammerCost){                                   //checks that the player can afford the apprentice
    	hammers = hammers + 1;                                   //increases number of apprentices
    	tableLegs = tableLegs - hammerCost;                          //removes the tableLegs spent
        document.getElementById('hammers').innerHTML = hammers;  //updates the number of apprentices for the user
        document.getElementById('tableLegs').innerHTML = tableLegs;  //updates the number of tableLegs for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,hammers));       //works out the cost of the next apprentice
    document.getElementById('hammerCost').innerHTML = nextCost;  //updates the apprentice cost for the user
    incLegCount+=1;
}

window.setInterval(function(){
	
	autoClick(apprentices-jrApprentices+jrApprentices*5);
	
}, 1000);