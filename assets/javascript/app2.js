
var questions = [
        {
        question: "Karl Hungus and his pals were adherents of what school of philosophy?",
        answers: ["Existentialism", "Utilitarianism", "Nihilism", "Anarchism"],
        correct: "Nihilism"
        },
    
        {
        question: "What is Donny's full name?",
        answers: ["Theodore Donald Karabotsos", "Don Giovanni Cabezos", "Ronald McDonald Kropotkin",  "Regis Donicus Kouskous"],
        correct: "Theodore Donald Karabotsos"
        }, 
        {
        question: "The Big Lebowski was set during whose presidency?",
        answers: ["Ronald Reagan","Gerald Ford","Bill Clinton","George H.W. Bush"],
        correct: "George H.W. Bush"
        },
        {
        question: "Why did Maude Lebowski seek out the Dude?",
        answers: ["To score some dank nugs","to be in a nude bowling calendar","to join her breakdancing crew","To help her conceive"],
        correct: "To help her conceive"
        },
          {
        question: "Walter was dog-sitting his ex-wife's... ",
        answers: ["Pomeranian","Pug","Poodle","Pekingese"],
        correct: "Pomeranian"
        },
         {
        question: "Larry Sellers lives in North Hollywood near what burger chain?",
        answers: ["Whataburger","Jack-in-the-box","Aloha Burger","In-and-out Burger"],
        correct: "In-and-out Burger"
        },
    //     {
    //     question: "",
    //     answers: ["","","",""],
    //     correct: ""
    //     },
    //     {
    //     question: "",
    //     answers: ["","","",""],
    //     correct: ""
    //     },
    //     {
    //     question: "",
    //     answers: ["","","",""],
    //     correct: ""
    //     }, 
    //     {
    //     question: "",
    //     answers: ["","","",""],
    //     correct: ""
    //     },
]
var images = ["assets/images/nihilists.jpg", 
"assets/images/donny.jpg", 
"assets/images/bush.jpg", 
"assets/images/maude.gif",
"assets/images/walter.jpg",
"assets/images/in-and-out.jpg"]
var index = 0;
var count = 10;
var rightAnswers = 0;
var wrongAnswers = 0;
var notAnswered = 0;
var clockRunning = false;
var currentCorrectAns = ""

$('#start-btn').on("click", startGame)
$(document).on('click', '.answer', function(){
    //check if correct
    console.log(event.target.innerText)
    console.log(currentCorrectAns)
    if(event.target.innerText === currentCorrectAns){
        handleRightAnswer()
    }
    else{
        handleWrongAnswer()
    }
})
function handleRightAnswer(){
    rightAnswers++
    $('#message').html("CORRECT!!!" + "<br>" +  questions[index].correct)
    displayImage()
    count = 10
    clockRunning = false
    clearInterval(intervalId)
    setTimeout(nextQuestion, 2500)

    
}
function handleWrongAnswer(){
    wrongAnswers++
    $('#message').html("WRONG" + "<br>" + "Correct Answer: " + questions[index].correct)
    displayImage()
    count = 10
    clockRunning = false
    clearInterval(intervalId)
    setTimeout(nextQuestion, 2500)
}
function displayImage(){
    var image = $('<img>');
    image.attr("src", images[index]);
    $('#image').append(image)
    $('#time-remaining').text('00:00')
    $('#question').empty()
    $('#answers').empty()
}

function startGame(){
    $('#start-btn').css("display", "none")
    $('#inner').css("visibility", "visible")
    $('#time-remaining').css("visibility", "visible")
    if (!clockRunning) {
        intervalId = setInterval(countDown, 1000)
        clockRunning = true
      }
    displayQandA()
    currentCorrectAns = questions[index].correct
}
function displayQandA(){
    var div = $('<div>')
    div.text(questions[index].question)
    $('#question').append(div)
    for(var i = 0; i < 4;i++){
        var answerLi = $('<button>')
        answerLi.append(questions[index].answers[i]).addClass('answer')
        $('#answers').append(answerLi)
    }
}
function countDown(){
    count--
    
    if(count >= 0){
        //convert count and display it
        $('#time-remaining').html(timeConverter(count))
    }
    else{
        timesUp()
    }
}
function timesUp(){
    notAnswered++
    count = 10
    clockRunning = false
    clearInterval(intervalId)
    setTimeout(nextQuestion, 2500)
    $('#message').html("Time's UP!" + "<br>" + "Correct Answer: " + questions[index].correct)
    displayImage()
}
function nextQuestion(){
    index++
    if(index === questions.length ){
        gameOver()
    }
    else{
        clockRunning = true
        currentCorrectAns = questions[index].correct
        displayQandA()
        $('#image').empty()
        $('#message').empty()
        count = 10
    
        $('#time-remaining').text("00:10")
        intervalId = setInterval(countDown, 1000)  
    }
}
function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
  
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }
function gameOver(){
    $('#image').empty()
    $('#message').html('Game Over')
    $('#correct-message').html('Correct Answers: ' + rightAnswers)
    $('#wrong-message').html('Wrong Answers: ' + wrongAnswers)
    $('#unanswered-message').html('Unanswered: ' + notAnswered)
    $('#start-over-btn').css('display', 'inline')
}
function reset(){
    $('#message').empty()
    $('#correct-message').empty()
    $('#wrong-message').empty()
    $('#unanswered-message').empty()
    $('#start-over-btn').css('display', 'none')
    count = 10;
    rightAnswers = 0;
    wrongAnswers = 0;
    notAnswered = 0;
    clockRunning = false;
    currentCorrectAns = ""
    // <div id="message"></div>
    // <div><h4 id="correct-message"></h4></div>
    // <div ><h4 id="wrong-message"></h4></div>
    // <div><h4 id="unanswered-message"></h4></div>
    // <button id="start-over-btn">Play Again?</button>
}

$("#start-over-btn").on('click', function(){
    index = 0;
    reset();
    startGame();
})















// var index = 0;
// var rightAnswers = 0;
// var wrongAnswers = 0;
// var notAnswered = 0;
// var count = 10;
// var clockRunning = false;
// var questions = [
//     "Karl Hungus and his pals were adherents of what school of philosophy?",
//     "What is Donny's full name?", 
//     "The Big Lebowski was set during whose presidency?",
//     "Why did Maude Lebowski seek out the Dude?"
// ]
// var images = ["nihilists.jpg", "donny.jpg", "bush.jpg", "maude.gif" ]
// var answers = [
//     "<li><input type=\"radio\">&nbsp;&nbsp;Existentialism</li><li><input type=\"radio\">&nbsp;&nbsp;Utilitarianism</li><li><input type=\"radio\" class=\"correct\">&nbsp;&nbsp;Nihilism</li><li><input type=\"radio\">&nbsp;&nbsp;Altruism</li>",
//     "<li><input type=\"radio\" class=\"correct\">&nbsp;&nbsp;Theodore Donald Karabotsos</li><li><input type=\"radio\">&nbsp;&nbsp;Don Giovanni Cabezos</li><li><input type=\"radio\">&nbsp;&nbsp;Ronald McDonald Kropotkin</li><li><input type=\"radio\">&nbsp;&nbsp;Regis Donicus Kouskous</li>",
//     "<li><input type=\"radio\">&nbsp;&nbsp;Ronald Reagan</li><li><input type=\"radio\">&nbsp;&nbsp;Gerald Ford</li><li><input type=\"radio\">&nbsp;&nbsp;Bill Clinton</li><li><input type=\"radio\" class=\"correct\">&nbsp;&nbsp;George H.W. Bush</li>",
//     "<li><input type=\"radio\">&nbsp;&nbsp;To score some dank nugs</li><li><input type=\"radio\">&nbsp;&nbsp;to be in a nude bowling calendar</li><li><input type=\"radio\">&nbsp;&nbsp;to join her breakdancing crew</li><li><input type=\"radio\" class=\"correct\">&nbsp;&nbsp;To help her conceive</li>"
    
// ]
// var correctAnswers = ["Nihilism", "Theodore Donald Karabotsos", "George H.W. Bush", "To help her conceive"]
// function startGame(){
//     index = 0;
//     rightAnswers = 0;
//     wrongAnswers = 0;
//     notAnswered = 0;
//     count = 10;
//     clockRunning = false;
//     $('#message').empty()
//     $('#correct-message').empty()
//     $('#wrong-message').empty()
//     $('#unanswered-message').empty()
//     $('#start-over-btn').css("display", 'none')
//     $('#inner').css("visibility", "visible")
//     $('#title-text').css("display", "none")
//     $('#start-btn').css("display", "none")
//     $('#time-remaining').css('visibility', 'visible').html("Time Remaining: 00:10")
//     $('#question').html(questions[index])
//     $('#answers').html(answers[index])
    // if (!clockRunning) {
    //     intervalId = setInterval(countDown, 1000)
    //     clockRunning = true
    //   }

// }

// function countDown(){
//     count--
    
//     if(count > 0){
//         //convert count and display it
//         $('#time-remaining').html("Time Remaining: " + timeConverter(count))
//     }
//     else{
//         timesUp()
//     }
// }


// function timesUp(){
//     notAnswered++
//     count = 10
//     clockRunning = false
//     clearUnneeded()
//     setTimeout(nextQuestion, 2500)
//     $('#message').html("Time's UP!" + "<br>" + "Correct Answer: " + correctAnswers[index])
//     $('#image').html("<img src=\"assets/images/" + images[index] + "\">")
//     index++
// }

    

// function nextQuestion(){
//     if(index === questions.length ){
//         gameOver()
//     }
//     else{
//         clockRunning = true
//         $('#question').html(questions[index])
//         $('#answers').html(answers[index])
//         $('#image').empty()
//         $('#message').empty()
//         count = 10
    
//         $('#time-remaining').css('visibility', "visible").html("Time Remaining: 00:10")
//         intervalId = setInterval(countDown, 1000)  
//     }
// }
// function gameOver(){
//     clearUnneeded()
//     $('#image').empty()
//     $('#message').html('Game Over')
//     $('#correct-message').html('Correct Answers: ' + rightAnswers)
//     $('#wrong-message').html('Wrong Answers: ' + wrongAnswers)
//     $('#unanswered-message').html('Unanswered: ' + notAnswered)
//     $('#start-over-btn').css('display', 'inline')
// }


// function clearUnneeded(){
    // $('#time-remaining').css('visibility',"hidden")
    // $('#question').empty()
    // $('#answers').empty()
    // clearInterval(intervalId)
    
// }
// function handleRightAnswer(){
//     rightAnswers++
//     clearUnneeded()
//     $('#message').html("CORRECT!!!" + "<br>" +  correctAnswers[index])
//     $('#image').html("<img src=\"assets/images/" + images[index] + "\">")
//     index++
//     count = 10
//     clockRunning = false
//     setTimeout(nextQuestion, 2500)
    
// }
// function handleWrongAnswer(){
//     wrongAnswers++
//     clearUnneeded()
//     $('#message').html("WRONG" + "<br>" + "Correct Answer: " + correctAnswers[index])
//     $('#image').html("<img src=\"assets/images/" + images[index] + "\">")
//     index++
//     count = 10
//     clockRunning = false
//     setTimeout(nextQuestion, 2500)
// }
// function timeConverter(t) {

//     //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
//     var minutes = Math.floor(t / 60);
//     var seconds = t - (minutes * 60);
  
//     if (seconds < 10) {
//       seconds = "0" + seconds;
//     }
  
//     if (minutes === 0) {
//       minutes = "00";
//     }
  
//     else if (minutes < 10) {
//       minutes = "0" + minutes;
//     }
  
//     return minutes + ":" + seconds;
//   }


// $('#start-btn').on("click", startGame)

// $(document).on("click", 'input', function(){
//     if (this.className === "correct"){
//         handleRightAnswer()
//     }
//     else {
//         handleWrongAnswer()
//     }
// })//used because the element was created dynamically.  Why won't jquery selector work??

// //when click on answer, check if correct
// $("#start-over-btn").on('click', startGame)
