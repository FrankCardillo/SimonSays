var app = angular.module('SimonSays', []);
app.controller('MainCtrl', function($scope) { 

  $scope.roundCount = 1; 
  $scope.humanCount = -1; 
  $scope.isStrict = false; 
  $scope.isOn = false; 
  $scope.reset = true;
  $scope.disableQuarters = false;
  $scope.moveSet = [];
  $scope.curMove = 0;
  $scope.playerMove = "#id"; 
  $scope.redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  $scope.blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  $scope.greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  $scope.yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  
  
  $scope.populateMoveSet = function() {
    if ($scope.isOn === true) {
      while ($scope.moveSet.length < 20) {
        var randID = Math.floor(Math.random() * 4) + 1;
        if (randID === 1) {
          $scope.moveSet.push("red");
        }
        else if (randID === 2) {
          $scope.moveSet.push("blue");
        }
        else if (randID === 3) {
          $scope.moveSet.push("green");
        }
        else {
          $scope.moveSet.push("yellow");
        }
      }
    }
  };
  
  $scope.onButton = function() {
    $scope.isOn = true;
    $scope.populateMoveSet();
  };
  
  $scope.offButton = function() {
    $scope.isOn = false;
    $scope.moveSet = [];
    $scope.humanMove = -1;
    $scope.roundCount = 1;
  };
  
  $scope.strictButton = function() {
    if ($scope.isStrict === false) {
      $scope.isStrict = true;
    }
    else { 
      $scope.isStrict = false;
    }
  };
  
  $scope.playSequence = function() {
    // I check to see if $scope.isOn === true so often because the player can turn the game off at any point. I don't want the sequence to continue after the player does that to better simulate a physical machine.
    
    $scope.disableQuarters = true;
    if ($scope.isOn === true) {
      if ($scope.isOn === true && $scope.moveSet[$scope.curMove] === "red") {
        $scope.redSound.play();
      }
      else if ($scope.isOn === true && $scope.moveSet[$scope.curMove] === "blue") {
        $scope.blueSound.play();
      }
      else if ($scope.isOn === true && $scope.moveSet[$scope.curMove] === "green") {
        $scope.greenSound.play();
      }
      else {
        if ($scope.isOn === true) {
          $scope.yellowSound.play();
        }
      }

      if ($scope.isOn === true) {
        $("#" + $scope.moveSet[$scope.curMove]).effect("bounce");
      }
      
      if ($scope.curMove++ >= $scope.roundCount-1 && $scope.isOn === true) {
        $scope.curMove = 0;
        $scope.disableQuarters = false;
        return;
      }
      
      // incrementally speed up the playing of the sequence as the player reaches higher rounds. They are ordered from highest to lowest round so that the conditions of the lower rounds aren't satisfied first, which would prevent the higher round conditions from coming into effect.

      if ($scope.isOn === true && $scope.roundCount-1 >= 12) {
        window.setTimeout($scope.playSequence, 300);
      }
      
      if ($scope.isOn === true && $scope.roundCount-1 > 8 && $scope.roundCount-1 < 12) {
        window.setTimeout($scope.playSequence, 400);
      }
      
     if ($scope.isOn === true && $scope.roundCount-1 >= 4 && $scope.roundCount-1 <= 8) {
        window.setTimeout($scope.playSequence, 600);
      }
      
     if ($scope.isOn === true && $scope.roundCount-1 < 4) {
        window.setTimeout($scope.playSequence, 800);
      }
      
    }
  };
  
  $scope.humanMakeMove = function(id) {
    // I check to see if $scope.isOn === true so often because the player can turn the game off at any point. I don't want the sequence to continue after the player does that to better simulate a physical machine.
    
    if ($scope.isOn === true && $scope.disableQuarters === false) {
      $scope.playerMove = id;
      $scope.humanCount += 1;
      
      if ($scope.isOn === true) {
        $('#'+ id).effect("bounce");
      }
      if ($scope.isOn === true && id === "red") {
        $scope.redSound.play();
      }
      else if ($scope.isOn === true && id === "blue") {
        $scope.blueSound.play();
      }
      else if ($scope.isOn === true && id === "green") {
        $scope.greenSound.play();
      }
      else {
        if ($scope.isOn === true) {
          $scope.yellowSound.play();
        }
      }
      
      if ($scope.isOn === true) {
        $scope.checkMove();
      }
    }
  };
  
  $scope.checkMove = function() {
    if ($scope.playerMove !== $scope.moveSet[$scope.humanCount]) {
      if ($scope.isStrict === true) {
        alert("You Lose!!!");
        $scope.roundCount = 1;
        $scope.moveSet = [];
        $scope.isOn = false;
        $scope.isStrict = false;
        $scope.humanCount = -1;
        $scope.playerMove = "#id";
      }
      else {
        alert("You Messed Up!!! Press the start button to play the sequence again.");
        $scope.humanCount = -1;
        $scope.playerMove = "#id";
      }      
    }
    
    else if ($scope.playerMove === $scope.moveSet[$scope.humanCount] && $scope.humanCount === $scope.roundCount-1) {
      $scope.roundCount += 1;
      $scope.playSequence();
    }
    
    else if ($scope.count === 20 && $scope.playerMove === $scope.moveSet[$scope.moveSet.length - 1]) {
      alert("You Win!!!");
      $scope.roundCount = 1;
      $scope.moveSet = [];
      $scope.humanCount = -1;
      $scope.isOn = false;
      $scope.isStrict = false;
      $scope.playerMove = "#id";
    }
  };
  
});
