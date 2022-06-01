var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var lvl = 0;

// wait a button to be pressed to start the game
$("body").dblclick(function () {
  if (lvl === 0) {
    setTimeout(function () {
      nextSequence();
    }, 500);
    $("h3").text("");
    //activate click
    $(".no-click").removeClass("no-click");
  } // if
});

// detect button clicked, take the id
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour); // add it to array

  // play the sound for each
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
  // console.log(userChosenColour);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // disable the click
    $(".container").addClass("no-click");

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over"), 200;
    });
    $("#level-title").text("Game Over, DoubleClick on Screen to Restart");
    $("h3").text(`Final Level ${lvl - 1}`);

    //reset
    lvl = 0;
    gamePattern = [];
    userClickedPattern = [];
  }
} //checkAnswer

function nextSequence() {
  // change the title with the current Level
  $("#level-title").text(`Level ${lvl}`);

  // generate a random num
  var numRand = Math.floor(Math.random() * 4);
  // pick random color
  var randomChosenColour = buttonColours[numRand]; // add it in to array

  //add the random color to gamePattern
  gamePattern.push(randomChosenColour);

  // select the box with the id that has the same name as the color
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  // clear the user array
  userClickedPattern = [];
  lvl += 1; // add lvl
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  // add the class to specific id
  $(`.${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`.${currentColour}`).removeClass("pressed");
  }, 100);
}
