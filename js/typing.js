//Dit registreert de enter key click
var inGame = false;
var currentWord, amountOfErrors, goodAnswers, previousWord;
var timer, time;



$(document).ready(function() {
  //Kijken of enter word ingedrukt
  $(document).keypress(function(e) {
      if(e.which == 13) {
          enterWord();
      }
  });

  $("#startBtn").click(function () {
    //Start de game als de speler op start klikt
    startGame();
    $("#startBtn").hide();
  })

});


function startGame() {
  //Zeg dat de game start
  inGame = true;
  document.getElementById("wordField").focus();

  //Reset alle vatiablen
  amountOfErrors = 0;
  corrections = 0;
  goodAnswers = 0;
  $("#currentWord").html("");
  $("#corrections").html("");
  $("#errors").html("");
  $("#goodAnswers").html("");
  $("#wpm").html("");

  pickWord();

  //start de timer
  $("#timer").show();
  startTimer();


}

function stopGame () {

  //Stop de timer
  clearInterval(timer);
  $("#timer").hide();
  $("#startBtn").show();
  $("#wordField").val("");

  //Zeg dat de game klaar is
  inGame = false;

  //Laat zien aan de speler dat hij klaar is
  $("#currentWord").html("<strong>Done...</strong>");
  $("#errors").html('<strong>Amount of errors: '+amountOfErrors+'</strong>');
  $("#wpm").html('<strong>Words per minute: '+goodAnswers+'</strong>');

}

function startTimer() {

  //Zet de timer op 0
  time = 60;

  //Elke 0.1 seconden update de timer met 0.1.
  timer = setInterval(function () {
    if (time <= 0) {
      stopGame();
    }
    time = time +- 0.1;
    $("#timer").html("<strong>"+time.toFixed(2)+"</strong>")
  },100);

}

function enterWord () {
  //Als de speler niet ingame is
  if (inGame == false) {
    //Niks doen
  } else if (inGame == true) { //wel in game
    //Handle game logic here
    checkWord();
  }
}

function checkWord () {
    var enteredWord = $("#wordField").val();

    //Checken of de speler het goede word in heeft getyped
    if (enteredWord == currentWord) {
      //Zo ja? dan laten we het volgende word zien en zetten we wat variablen anders
      fadeColor("wordField", "backgroundColor", "rgb(43,234,81)");
      $("#wordField").val("");
      pickWord();
      goodAnswers++;
      previousWord = currentWord;

    } else {
      //Zo nee? dan maaken we het word rood en zeggen en kan de speler het opnieuw doen.
      //Ook doen we +1 bij het amountOfErrors variable
      amountOfErrors++;
      fadeColor("wordField", "backgroundColor", "rgb(234,43,43)");
    }
}
function pickWord () {

  //Eerst kijken hoeveel worden we hebben in onze woorden array
  var aantalWoorden = woorden.length;
  //Dat aantal plus 1
  aantalWoorden = aantalWoorden + 1;

  //Een random nummer kiezen tussen het aantalWoorden en 0
  var randomWord = Math.floor((Math.random() * aantalWoorden) + 0);

  //Met het randomWord nummer dat word uit de array selecteren
  currentWord = woorden[randomWord];

  //Kijken of het niet hetzelfde word is
  if (currentWord == previousWord || currentWord == undefined) {
    pickWord();
  } else {
    //word laten zien aan de speler met jquery
    $("#currentWord").html("<strong>"+currentWord+"</strong>");
  }
}

var woorden = ["value" , "meanwhile", "finally" , "base" , "spikes" ,"creature", "comforts" , "advanced" , "the snout" , "opposite", "the spoon" , "the dust cloud" , "scrape" , "natural" , "significantly" , "the hedgehog" , "create" , "offset" , "enlarge" , "treacherous" , "the direction" , "the culture" , "the territory", "the timetable"];


function fadeColor(id, property, color) {
    var oProperty = $('#'+id+'').css(property);

    $('#'+id+'').css(property, color);
    setTimeout(function() {
      $('#'+id+'').css(property, oProperty);
    },300);
}
