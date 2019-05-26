//Global variables


var incLegCount = 1;

//Materials/currency
var tableLegs = 50000;
var money = 10000000;
var chairs = 0;
var tables = 0;

//early game upgrade variables
var toolBoxUpgradeLevel = 0;
var chairUpgradeLevel = 0;//Meant for your own personal chair that you use to carve your table legs.  Refactor later
var workStationUpgradeLevel = 0;

//unlock flags
var tableUnlocked=false;
var chairUnlocked=false;

//units
var apprentices = 0;
var jrApprentices = 0;
var salesmen = 0;
var candyBarSalesmen=0;
var chairBuilders= 0;
var seniorChairBuilders = 0;
var tableBuilders= 0;
var seniorTableBuilders = 0;






/**
 * A function that handles all automated building other than table leg production.
 */
function autoBuild(){
	var cNum=chairBuilders+seniorChairBuilders*5;
	var tNum=tableBuilders+seniorTableBuilders*5;
	if((money>=(50*cNum)+(100*tNum))&&(tableLegs>=4*(cNum+tNum))){
		chairs+=cNum;
		tables+=tNum;
		money-=(cNum*50)+(tNum*100);
		tableLegs-=(cNum+tNum)*4;
	}
//	else{//TODO: come up with an algorithm to prioritize where insufficient resources go to.  I'll want either to exclusively target the most expensive products, or distribute resources more evenly.
		
//	}
};
/**
 * A function that increments your tableLegs according to the size of the increment.
 */
function tableLegClick(){
    tableLegs = tableLegs + incLegCount;
    document.getElementById("tableLegs").innerHTML = tableLegs;
};

/**
 * an auto leg click function
 * @param number
 * @returns
 */
function autoClick(number){
    tableLegs = tableLegs + number;
    document.getElementById("tableLegs").innerHTML = tableLegs;
};


/**
 * Autosell tablelegs
 * @returns
 */
function autoSell(){
	if(tableLegs>=11*salesmen){
		tableLegs-=11*salesmen;
		
		if(candyBarSalesmen>0){
			money=money+salesmen*(candyBarSalesmen*1.1);
		}else{
			money+=salesmen;
		}
		
	}else{
		money+=tableLegs/15;
		tableLegs=0;
	}
	money+=candyBarSalesmen*2;
	document.getElementById('money').innerHTML = money;  
	
};


//Early game upgrades


/**
 * A basic early game upgrade that increases your click power.
 */
function upgradeToolBox(){
    var toolBoxUpgradeCost = 1+toolBoxUpgradeLevel*2;    	 //works out the cost of this upgradeLevel
    if(money >= toolBoxUpgradeCost && toolBoxUpgradeLevel<5){                              				    	 //checks that the player can afford the toolBoxUpgrade
        toolBoxUpgradeLevel += 1;                              	 //increases the toolBoxUpgradeLevel
    	money = money - toolBoxUpgradeCost;                         					 //removes the money spent
        document.getElementById('toolBoxUpgradeLevel').innerHTML = toolBoxUpgradeLevel;  //updates the  toolBoxUpgradeLevel for the user
        document.getElementById('money').innerHTML = money;  							//updates the money for the user
        incLegCount++;																	//increase the leg count per click
    };
	var nextCost = 1+toolBoxUpgradeLevel*2;
	if(toolBoxUpgradeLevel==5){
		nextCost="MAX";
	}      			//works out the cost of the next upgrade level
    document.getElementById('toolBoxUpgradeCost').innerHTML = nextCost; 				 //updates the upgrade cost for the user


}

/**
 * Another early game upgrade to increase click power.
 */
function upgradeChair(){
	var chairUpgradeCost = 5+chairUpgradeLevel*5;    	 
	if(money >= chairUpgradeCost && chairUpgradeLevel<5){               
		chairUpgradeLevel += 1;                            
		money = money - chairUpgradeCost;                         			
		document.getElementById('chairUpgradeLevel').innerHTML = chairUpgradeLevel;  
		document.getElementById('money').innerHTML = money;  							
		incLegCount++;																	
	};
	var nextCost = 5+chairUpgradeLevel*5;
	if(chairUpgradeLevel==5){
		nextCost="MAX";
	}
	
	document.getElementById('chairUpgradeCost').innerHTML = nextCost; 		

}

/**
 * A similar early game upgrade.
 */
function upgradeWorkStation(){
	var workStationUpgradeCost = 10+workStationUpgradeLevel*15;    	 
	if(money >= workStationUpgradeCost && workStationUpgradeLevel<5){               
		workStationUpgradeLevel += 1;                            
		money = money - workStationUpgradeCost;                         			
		document.getElementById('workStationUpgradeLevel').innerHTML = workStationUpgradeLevel;  
		document.getElementById('money').innerHTML = money;  							
		incLegCount++;																	
	};
	var nextCost = 10+workStationUpgradeLevel*15;
	if(workStationUpgradeLevel==5){
		nextCost="MAX";
	}
	document.getElementById('workStationUpgradeCost').innerHTML = nextCost; 		

}





/**
 * This function sells table legs for money.
 * It only takes multiples of 10 table legs.
 * This method is intended for manual sales.
*/
function sellTableLegClick(number){
	if(tableLegs>=number&&number%10==0){
		tableLegs-=number;
		money += number / 10;

	};
	document.getElementById("money").innerHTML = money;
};



//Apprentice functions



/**
 * Apprentices automatically produce table legs.
 */

function buyApprentice(){
    var apprenticeCost = Math.floor(1 * Math.pow(1.1,apprentices));     //works out the cost of this apprentice
    if(money >= apprenticeCost){                                   //checks that the player can afford the apprentice
        apprentices = apprentices + 1;                                   //increases number of apprentices
    	money = money - apprenticeCost;                          //removes the money spent
        document.getElementById('apprentices').innerHTML = apprentices;  //updates the number of apprentices for the user
        document.getElementById('money').innerHTML = money;  //updates the number of money for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,apprentices));       //works out the cost of the next apprentice
    document.getElementById('apprenticeCost').innerHTML = nextCost;  //updates the apprentice cost for the user

};

/**
 * upgrades an apprentice to Jr. Apprentice.  Jr. Apprentices make more table legs.
 */

function promoteApprentice(){
    var jrApprenticeCost = Math.floor(250 * Math.pow(1.1,jrApprentices));     //works out the cost of this apprentice
    if(money >= jrApprenticeCost && jrApprentices < apprentices){                                   //checks that the player can afford the apprentice
        jrApprentices = jrApprentices + 1;                                   //increases number of apprentices
    	money = money - jrApprenticeCost;                          //removes the money spent
        document.getElementById('jrApprentices').innerHTML = jrApprentices;  //updates the number of apprentices for the user
        document.getElementById('money').innerHTML = money;  //updates the number of money for the user
    };
    var nextCost = Math.floor(250 * Math.pow(1.1,jrApprentices));       //works out the cost of the next apprentice
    document.getElementById('jrApprenticeCost').innerHTML = nextCost;  //updates the apprentice cost for the user

};


//Click upgrade functions


/**
 * An upgrade to increase you click power.
 */
var hammers = 0;
function buyHammer(){
    var hammerCost = Math.floor(10 * Math.pow(1.1,hammers));     //works out the cost of this apprentice
    if(money >= hammerCost){                                   //checks that the player can afford the apprentice
    	hammers = hammers + 1;                                   //increases number of apprentices
    	money = money - hammerCost;                          //removes the money spent
        document.getElementById('hammers').innerHTML = hammers;  //updates the number of apprentices for the user
        document.getElementById('money').innerHTML = money;  //updates the number of money for the user
    
    var nextCost = Math.floor(10 * Math.pow(1.1,hammers));       //works out the cost of the next apprentice
    document.getElementById('hammerCost').innerHTML = nextCost;  //updates the apprentice cost for the user
    incLegCount+=1;
    };
}



//Salesmen functions



/**
 * The salesmen are people that sell table legs automatically.
 * @returns
 */
function hireSalesman(){//Salesmen are people who sell table legs automatically.  However, they take some of the profit for themselves.
	var salesmanCost = Math.floor(500 * Math.pow(1.1,salesmen));
	 if(money >= salesmanCost){                                   //checks that the player can afford the apprentice
		 salesmen = salesmen + 1;                                   //increases number of apprentices
	    	money = money - salesmanCost;                          //removes the money spent
	        document.getElementById('salesmen').innerHTML = salesmen;  //updates the number of apprentices for the user
	        document.getElementById('money').innerHTML = money;  //updates the number of money for the user
	    };
	    var nextCost = Math.floor(500 * Math.pow(1.1,salesmen));       //works out the cost of the next apprentice
	    document.getElementById('salesmanCost').innerHTML = nextCost;
}

/**
 * candyBarSalesmen are people who sell candy bars.  They generate small amounts of money over time because of the money that you invested in them.
 * They also motivate other salesmen to work harder because of how devoted they are to their work.
 * I wish to make this feature more complex by having 2 characters for this unit - a box of bran flakes, and something else that looks like a star for some reason.
 * TODO: properly display pricing.
 */

function hireCandyBarSalesman(){
	var candyBarSalesmanCost = 15000 * Math.pow(candyBarSalesmen + 1, 8);//this makes the second candybar salesman much more expensive.
	if(money >= candyBarSalesmanCost && candyBarSalesmen<2){
		candyBarSalesmen+=1;
		money = money - candyBarSalesmanCost;
		document.getElementById('candyBarSalesmen').innerHTML = candyBarSalesmen;
		document.getElementById('money').innerHTML = money;
	};
//	var nextCost = math.floor(15000*Math.pow(candyBarSalesmen+1, 8));//The pricing wasn't displaying properly, so I decided to change things.
	var nextCost=15000*256;
	if(candyBarSalesmen!=1){
		nextCost="MAX";
	}
	document.getElementById('candyBarSalesmanCost').innerHTML = nextCost;
}




//Chair functions




/**
 * A function that unlocks the building of chairs.
 */
function unlockChairBuilding(){
	if(money>=25000&&chairUnlocked==false){
		money-=25000;
		chairUnlocked = "Unlocked";
		document.getElementById('chairUnlocked').innerHTML = chairUnlocked;
		document.getElementById('unlockChairCost').innerHTML = chairUnlocked;
	}
}

/**
 * Build several chairs.
 * @param number
 * @returns
 */ 
function buildChairs(number){
	if(money>=50*number&&tableLegs>=4*number&&chairUnlocked!=false){
		money-=50*number;
		tableLegs-=4;
		chairs+=number;
		document.getElementById('chairCount').innerHTML = chairs;
	}
}

/**
 * Sell a number of chairs.
 * TODO: connect to the html document
 * @param number
 * @returns
 */
function sellChairs(number){
	if(chairs>=number){
		chairs-=number;
		money+=75*number;
		document.getElementById('chairCount').innerHTML = chairs;
		document.getElementById('money').innerHTML = money;
	}
}

/**
 * chairBuilders are people who make chairs.
 * They make chairs from four table legs and money for misc. parts.
 * You can sell chairs manually, or hire a chair salesman.
 * TODO: connect to the html document.
 */
function hireChairBuilder(){
    var chairBuilderCost = Math.floor(7500 * Math.pow(1.1,chairBuilders)); 
    if(money >= chairBuilderCost&&chairUnlocked!=false){                                 
    	chairBuilders = chairBuilders + 1;                      
    	money = money - chairBuilderCost;                
    	var nextCost = Math.floor(7500 * Math.pow(1.1,chairBuilders));  
    	
    	
    	
    	document.getElementById('chairBuilders').innerHTML = chairBuilders;
    	document.getElementById('money').innerHTML = money;
    	document.getElementById('chairBuilderCost').innerHTML = nextCost;
    };
}

/**
 * Senior chair builders are chair builders who are faster.
 */
function promoteToSeniorChairBuilder(){
    var promoteChairBuilderCost = Math.floor(50000 * Math.pow(1.1,seniorChairBuilders)); 
    if(money >= promoteChairBuilderCost&&chairBuilders>0){
    	seniorChairBuilders+=1;
    	chairBuilders-=1;
    	money = money - promoteChairBuilderCost;
        var nextCost = Math.floor(50000 * Math.pow(1.1,seniorChairBuilders));  
        
        document.getElementById('seniorChairBuilders').innerHTML = seniorChairBuilders;
        document.getElementById('chairBuilders').innerHTML = chairBuilders;
        document.getElementById('money').innerHTML = money;
        document.getElementById('seniorChairBuilderCost').innerHTML = nextCost;
    
        //document.getElementById('chairBuilderCost').innerHTML = nextCost;
        //incLegCount+=1;
    }
}


//The table functions


/**
 * A function that unlocks the building of tables.
 */
function unlockTableBuilding(){
	if(money>=50000&&tableUnlocked==false){
		money-=50000;
		tableUnlocked = "Unlocked";
		document.getElementById('tableUnlocked').innerHTML = tableUnlocked;
		document.getElementById('unlockTableCost').innerHTML = tableUnlocked;
	}
}

/**
 * Build several tables.
 * @param number
 * @returns
 */ 
function buildTables(number){
	if(money>=100*number&&tableLegs>=4*number&&tableUnlocked!=false){
		money-=100*number;
		tableLegs-=4;
		tables+=number;
		document.getElementById('tableCount').innerHTML = tables;
	}
}

/**
 * Sell a number of tables.
 * TODO: connect to the html document
 * @param number
 * @returns
 */
function sellTables(number){
	if(tables>=number){
		tables-=number;
		money+=150*number;
		document.getElementById('tableCount').innerHTML = tables;
		document.getElementById('money').innerHTML = money;
	}
}

/**
 * tableBuilders are people who make tables.
 * They make tables from four table legs and money for misc. parts.
 * You can sell tables manually, or hire a table salesman.
 * TODO: connect to the html document.
 */
function hireTableBuilder(){
    var tableBuilderCost = Math.floor(15000 * Math.pow(1.1,tableBuilders)); 
    if(money >= tableBuilderCost&&tableUnlocked!=false){                                 
    	tableBuilders = tableBuilders + 1;                      
    	money = money - tableBuilderCost;                
    	var nextCost = Math.floor(1500 * Math.pow(1.1,tableBuilders));  
    	
    	document.getElementById('tableBuilders').innerHTML = tableBuilders;
    	document.getElementById('money').innerHTML = money;
    	document.getElementById('tableBuilderCost').innerHTML = nextCost;
    };
}

/**
 * Senior table builders are table builders who are faster.
 */
function promoteToSeniorTableBuilder(){
    var promoteTableBuilderCost = Math.floor(100000 * Math.pow(1.1,seniorTableBuilders)); 
    if(money >= promoteTableBuilderCost&&tableBuilders>0){
    	seniorTableBuilders+=1;
    	tableBuilders-=1;
    	money = money - promoteTableBuilderCost;
        var nextCost = Math.floor(100000 * Math.pow(1.1,seniorTableBuilders));  
        
        document.getElementById('seniorTableBuilders').innerHTML = seniorTableBuilders;
        document.getElementById('tableBuilders').innerHTML = tableBuilders;
        document.getElementById('money').innerHTML = money;
        document.getElementById('seniorTableBuilderCost').innerHTML = nextCost;
        
    }
}


//Automation


/**
 * This is a function which is responsible for automation.
 * @returns
 */
window.setInterval(function(){
	
	autoClick(apprentices-jrApprentices+jrApprentices*5);
	autoSell();
	autoBuild();
}, 1000);

