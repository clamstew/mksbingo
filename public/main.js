$(document).ready(function() {
  var gameWin = false;
  var gameSelections = [];
  for(i=0;i<25;i++){
    gameSelections.push(false);
    if(i==12){
    gameSelections[i] = true;
    $()
    }
  }
  var key = $("#board").attr('class');
  console.log(key)
  var dataRef = new Firebase('https://mksbingo.firebaseio.com/'+key+'/board');
  var dataRefSel = new Firebase('https://mksbingo.firebaseio.com/'+key+'/selected');
  var board_array = []
  var selected_array = []
  for(var i = 0; i < 25; i++){
    board_array[i] = $("#cell"+i).text().replace("\n    \n    ","");
    if($("#cell"+i).hasClass('selected')){
      selected_array[i] = true
      gameSelections[i] = true
    } else {
      selected_array[i] = false
    }
  }
  dataRef.set(board_array)
  dataRefSel.set(selected_array)

  var resetFunction = function() {
    dataRef.remove()
    dataRefSel.remove()
    location.reload()
  }

  var checkGameWin = function() {
      // horizontal win
      // i+1, change at 5
    if(gameSelections[0]&&gameSelections[1]&&gameSelections[2]&&gameSelections[3]&&gameSelections[4] ||
      gameSelections[5]&&gameSelections[6]&&gameSelections[7]&&gameSelections[8]&&gameSelections[9] ||
      gameSelections[10]&&gameSelections[11]&&gameSelections[12]&&gameSelections[13]&&gameSelections[14] ||
      gameSelections[15]&&gameSelections[16]&&gameSelections[17]&&gameSelections[18]&&gameSelections[19] ||
      gameSelections[20]&&gameSelections[21]&&gameSelections[22]&&gameSelections[23]&&gameSelections[24] ||
      // vertical win
      i+5, then add 1
      gameSelections[0]&&gameSelections[5]&&gameSelections[10]&&gameSelections[15]&&gameSelections[20] ||
      gameSelections[1]&&gameSelections[6]&&gameSelections[11]&&gameSelections[16]&&gameSelections[21] ||
      gameSelections[2]&&gameSelections[7]&&gameSelections[12]&&gameSelections[17]&&gameSelections[22] ||
      gameSelections[3]&&gameSelections[8]&&gameSelections[13]&&gameSelections[18]&&gameSelections[23] ||
      gameSelections[4]&&gameSelections[9]&&gameSelections[14]&&gameSelections[19]&&gameSelections[24] ||
      // diagonal wins
      //+6 from i = 0 and +4 from i=4
      gameSelections[0]&&gameSelections[6]&&gameSelections[12]&&gameSelections[18]&&gameSelections[24] ||
      gameSelections[4]&&gameSelections[8]&&gameSelections[12]&&gameSelections[16]&&gameSelections[20]) {
      $("#bingo").css('display', 'block');
      $("#bingo").css('left', $("body").width() / 2 - 105);
      $("#bingo").animate({width: '209px', height: '211px', top: $("body").height() / 2 - $("#bingo").height() / 2
      }, 3000);
      setTimeout(function() {
        var winRef = new Firebase('https://mksbingo.firebaseio.com/'+key+'/wins');
        var wins = Number($('#grav').attr("class").replace("wins","")) + 1;
        if(wins % 1 != 0) {
          wins = 1;
        }
        winRef.set(wins);
        var name = $("#name").text();
        var scoreboardRef = new Firebase('https://mksbingo.firebaseio.com/scoreboard/'+name);
        var gravatar = $("#grav").attr('src');
        scoreboardRef.set({"wins": wins, "img": gravatar})
        gameWin = true;
        resetFunction();
      }, 6000);

    }
  }

  checkGameWin();

  $("#reset").on('click',function(){
    resetFunction();
  })


  $(".square").on("click", function(){
    if(gameWin == false){
      $(this).addClass("selected");
      var cellID = Number($(this).attr('id').replace("cell", ""));
      gameSelections[cellID]=true;
      var dataRef = new Firebase('https://mksbingo.firebaseio.com/'+key+'/selected/'+cellID);
      dataRef.set(true);
      checkGameWin();
    };
  })


});
