
// //Function to start a new game
var startGame = function() {
  //reset player stats
  playerInfo.reset();

  //Fight loop
  for (var i = 0; i < enemyInfo.length; i++) {
    //If the player still lives, they keep fighting.
    if (playerInfo.health > 0) {
      //Round notification
      window.alert("Robot Gladiator. Round " + (i + 1));
        
      var pickedEnemyObj = enemyInfo[i];
        
      pickedEnemyObj.health = randomNumber(40, 60);

      console.log(pickedEnemyObj);  

      fight(pickedEnemyObj);
    }
    // If the player's health is gone, the loop must be broken and endGame function will run
    else {
      break;
    }
  }

  //After the loop, either the player is dead or all the enemies are so endGame will run
  endGame();
};

  // function to end the entire game
  var endGame = function() {

    // if player is still alive, player wins.
    if (playerInfo.health > 0) {
      window.alert("Great job, you've survived the game. You now have a score of " + playerInfo.money + ".");
    } else {
      window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
      // restart the game
      startGame();
    } else {
      window.alert("Thank you for playing. Come back soon.");
    }
  };

//create function(now with Enemy name's parameter flavors.)
var fight = function(enemy) {
  
  while (playerInfo.health > 0 && enemy.health > 0) {
    enemyHealth = randomNumber(40, 60);

    // ask player if they'd liked to fight or run
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye.');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        shop();          
        break;
      }
    }

  // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );
    
    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died.');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      //Ask if the player wants to go to the store prior to next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

      // If yes, then they are brought to the store
      if (storeConfirm) {
        shop();
      }
      
      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

     
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died.');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

//Time to shop between battles
var shop = function() {
  //ask the player what they want to do
  var shopOptionPrompt = window.prompt(
    "would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  //Use switch case to carry out the actions and hold items
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      break;
    case "UPGRADE":
    case "upgrade":
      playerInfo.upgradeAttack();
      break;
    case "LEAVE": // new case
    case "leave":
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

//player info
var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, // comma!
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }   
  }, // comma!
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
  }
};

//enemy info
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

//Starts the page when it loads
startGame();