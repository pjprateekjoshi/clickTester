const size = 20;
var boundary = 25;
var timerValueInSeconds = 15;
const canvasX = 1300;
const canvasY = 800;

var score = 0;
var x1 = 50, y1 = 50;
var timerValue = (timerValueInSeconds + 1) * 1000; //(+1) seconds time to adjust for visibility to user
var firstClick = true;
var gameSessionTillTime;
var endXRandomizer = canvasX - (2*boundary), endYRandomizer = canvasY - (2*boundary);
var ctx;
var randomNumber;


const canvas = document.querySelector('canvas')
//1300, 800

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if( x > x1 && x < (x1 + size) && y > y1 && y < (y1 + size) ){
        if(firstClick){
            gameSessionTillTime = new Date().getTime() + timerValue;
            startTimerNow();
            firstClick = false;
        }

        score ++;
        console.log("Score! Total: " + score);
        createNewRectangleIngame();
    } else {
        console.log("Ouch!");
    }
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)

})

function createNewRectangleIngame(){
    randomNumber = Math.random();
    x1 = (randomNumber * endXRandomizer) + boundary;
    randomNumber = Math.random();
    y1 = (randomNumber * endYRandomizer) + boundary;    
    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvasX,canvasY);
    drawRectangle(x1, y1);
}

createNewRectangleIngame();

function drawRectangle(x1, y1){
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(x1, y1, size, size);
    ctx.stroke();    
}


//////
// Update the count down every 1 second
function startTimerNow(){
    var x = setInterval(function() {
        var now = new Date().getTime();
        
        var distance = gameSessionTillTime - now;
    
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = "Time Remaining: " + seconds + "s ";
      
        // If the count down is finished, write some text
        if (distance < 0.9) {
          clearInterval(x);
          console.log("Final Score: " + score);
          document.getElementById("timer").innerHTML = "clickTester Completed. Score: " + score + ". Click on the small box to start playing again.";
          document.getElementById("scoreCounter").innerHTML += " " + score;
          score = 0;
          firstClick = true;
        }
      }, 1000);    
}

