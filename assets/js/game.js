//Game funtions

// //Function to start a new game
var startGame = function() {
  //reset player stats
  playerInfo.reset();

  //Fight loop
  for (var i = 0; i < enemyInfo.length; i++) {
    //check the player stats
    console.log(playerInfo);
    
      // If the player is still alive, keep fighting
      if (playerInfo.health > 0){
        //Round notification
        window.alert("Robot Gladiator. Round " + (i + 1));
        
        //New enemy picked based on the index of enemyInfo array
        var pickedEnemyObj = enemyInfo[i];
          
        //Set health for new challenger
        pickedEnemyObj.health = randomNumber(40, 60);

        console.log(pickedEnemyObj);

        // pass the pickedEnemyObj object variable's value into the fight function
        fight(pickedEnemyObj);

        //If the player is still alive after the fight and we're not at the last enemy in the array         
        if (playerInfo.health > 0 && enemyInfo.health - 1) {
          //ask if the player wants to use the store before next bout
          var storeConfirm = window.confirm( "The fight is over and you're a bit richer. Want to visit the store to fresehn up?");

          //If yes, then on to the store() function they go
          if (storeConfirm) {
            shop();
          }
        }
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
  window.alert("The dust has settled, the batttle is done. How did you fare?");

  //check localStorage for the high score, if it's not there, use 0
  var highScore = localStorage.getItem("Highscore") || 0;

  // If the player has more money than the high score, player has a high score!
  if (playerInfo.money > highScore) {
    localStorage.setItem("Highscore", playerInfo.money);
    localStorage.setItem("Name", playerInfo.name);

    alert(playerInfo.name + " is the baddest of the bad with a high score of " + playerInfo.money + "!");
  } else {
    alert(playerInfo.name + " did not prove their bad-itutde, they needed to beat " + highScore + ". Maybe next time.");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert("Thank you for playing. Y'all come back now, y'hear?!");
  }
};

  //Fight function(now with parameters that have the enemy's object holding name, health, and attack)
  var fight = function(enemy) {
    //keep track of who goes first
    var isPlayerTurn = true;

    //random starting order
    if (Math.random() > 0.5) {
      isPlayerTurn = false;
    }
    
    while (playerInfo.health > 0 && enemy.health > 0) {
      if (isPlayerTurn) {
        // ask player if they'd liked to fight or run using fightOrSkip function
        if (fightOrSkip()) {
          //if true, leave fight by breaking loop
          break;
        }      
        
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        //Remove enemy's health by subtracting the amount set by the DMG variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );
      
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died.");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left, finish them!!");
      }
      //If the player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      //remove player's health by subtracting the amount of DMG we set in the enemy variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died, womp womp.");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left. Get back in there!");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

//Time to shop between battles
var shop = function() {
  //ask the player what they want to do
  var shopOptionPrompt = window.prompt(
    "would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

  // verify if the prompt answer was left blank, player hit "cancel", or provided a number insteadd
  if (shopOptionPrompt === null || shopOptionPrompt === "" || isNaN(shopOptionPrompt)) {
    window.alert("You need to provide a valid answer, please try again!");
    return shop();
  }
  
  //convert answer from prompt to an actual number
  shopOptionPrompt = parseInt(shopOptionPrompt);

  //Switch case will carry the action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("It's 3 numbers, c'mon... Try again.");
      shop();
      break;
  }
};

//function to set name
var getPlayerName = function(){
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robots name is " + name);
  return name;
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

//Function to verify if the player wants to skip or not
var fightOrSkip = function () {
  //ask if they'd like to fight or run
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
  //Validate prompt answer
  if (promptFight === "" || promptFight === null || !isNaN(promptFight)){
    window.alert("Come ON dude, it's not thhat hard. I believe in you, try again!");
    //use return to call it again and stop the function from running again
    return fightOrSkip();
  }

  //Convert promptFight to all lowercare so we can check with less options
  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip") {
    //confirm if the player wants to skip
    var confirmSkip = window.confirm("Are you sure you wanna skip this fight?");

    //if yes(true), then leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to donate their money so they can skip the fight, Bye Felicia!");
      //subtract money from playerMoney for skipping, but don't let them go into the negative
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      ///stop while() loop using break; and enter the next fight

      //return true if player wants to leave
      return true;
    }
  }
  return false;
};
  
  // Game functions end

  //player info
var playerInfo = {
  name: getPlayerName(),
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
    } else {
      window.alert("You don't have enough money!");
    }
  }
};

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

//End game info/variable

//Starts the page when it loads
startGame();