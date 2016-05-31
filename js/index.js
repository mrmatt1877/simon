$(document).ready(function() {
  var start = null;
  var strict = null;
  var playerArr = [];
  var computerArr = [];
  var isItRight = false;
  var elems = document.getElementsByClassName("section");
  var sectionArr = jQuery.makeArray(elems);
  var one = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
  var two = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
  var three = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
  var four = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
  $('#id1,#id2,#id3,#id4').css("pointer-events", "none");
  $("#start").on("click", function() {
    if (start === null) {
      start = 1;
      computerTurn();
      $("#start").text("Stop");
    } else if (start !== null) {
      $("#start").text("Start");
      computerArr = [];
      playerArr = [];
      $(".section").removeClass("light");
      start = null;
    }
  })

  $("#strict").on("click", function() {
    if (strict === null) {
      $("#strict").text("Strict On");
      strict = true;
    } else {
      strict = null;
      $("#strict").text("Strict Off");
    }
  })

  $(".section").on("click", function() {
    playerArr.push(this);
    console.log(playerArr);
    $(this).addClass("light");
    setTimeout(function() {
      $(".section").removeClass("light");
    }, 100)

    if ($(this).hasClass("red")) {
      playSound(one);
    } else if ($(this).hasClass("blue")) {
      playSound(two);
    } else if ($(this).hasClass("green")) {
      playSound(three);
    } else if ($(this).hasClass("yellow")) {
      playSound(four);
    }

    checkArr();
    console.log(isItRight)
    if (isItRight === false) {
      if (strict === true) {
        computerArr = [];
        playerArr = [];
        alert("Try Again, Strict Mode:On");
        computerTurn();
      } else {
        alert("Try Again");
        playerArr = [];
        lightUp();
      }
    } else if (playerArr.length === computerArr.length && isItRight === true) {
      playerArr = [];
      computerTurn();
    }

  })

  function computerTurn() {
    $('#id1,#id2,#id3,#id4').css("pointer-events", "none");
    isItRight = false;
    var randomNum = Math.floor(Math.random() * 4);
    computerArr.push(sectionArr[randomNum])
    if (computerArr.length < 10) {
      $("#count").text("0" + computerArr.length);
    } else if (computerArr.length > 9) {
      $("#count").text(computerArr.length);
    }
    lightUp();
    setTimeout(function(){$('#id1,#id2,#id3,#id4').css("pointer-events", "auto")}, (1500*computerArr.length));
  }

  function lightUp() {
    var s = -1;
    setInterval(function() {
      s++;
      $(computerArr[s]).addClass("light");

      if ($(computerArr[s]).hasClass("red")) {
        playSound(one);
      } else if ($(computerArr[s]).hasClass("blue")) {
        playSound(two);
      } else if ($(computerArr[s]).hasClass("green")) {
        playSound(three);
      } else if ($(computerArr[s]).hasClass("yellow")) {
        playSound(four);
      }
      setTimeout(function() {
        $(computerArr[s]).removeClass("light");
      }, 1000);

    }, 1500)

  }

  function checkArr() {
    if (playerArr[playerArr.length - 1] !== computerArr[playerArr.length - 1]) {
      isItRight = false;
    } else {
      isItRight = true;
    }
  }

  function playSound(url) {
    var sound = new Audio(url);
    sound.play();
  }

});