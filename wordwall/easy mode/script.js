document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("bg-music").play()
})
var cards = document.querySelectorAll('.flip-card')
var imagecouple = []
var imagecontainer = []
var timerDisplay = document.getElementById("timer")
var timer = 0
var timerInterval = 0
var currentHighScore =document.getElementById("highscore")
var matchedImages=0
var gameStarted=false
//---------------------------
cards.forEach(function(card) {
  card.addEventListener('click', function() {
    if(!gameStarted) return
    var inner = card.querySelector('.flip-card-inner')
    var image = inner.querySelector('.flip-card-back img')
    if (imagecontainer.includes(card)) return
    //avoid selecting same image
    inner.classList.toggle("flip")
    imagecouple.push(image)
    imagecontainer.push(card)
    if (imagecouple.length === 2) {
      if (imagecouple[0].src === imagecouple[1].src) {
//----------------match case----------------------------------
        imagecontainer[0].classList.add("matched")
        imagecontainer[1].classList.add("matched")
        matchedImages++
        setTimeout(function () {
          imagecontainer[0].style.opacity = "0"
          imagecontainer[1].style.opacity = "0"
          imagecontainer[0].classList.remove("matched")
          imagecontainer[1].classList.remove("matched")
          imagecouple = []
          imagecontainer = []
//---------------------we verify if the game has end or not-----------------------------
          if (matchedImages=== cards.length/2) {
            alert("You match all cards in " + timer + " seconds")
            clearInterval(timerInterval)
            timerInterval =""
            gameStarted=false
            timerDisplay.textContent = timer
            if(currentHighScore>timer || currentHighScore.textContent==="---" ){
                alert("You have done new record ")
                currentHighScore.textContent=timer
            }
          }
        }, 500)
      } else {
//----------------------------unmatch case-------------------------------------
        setTimeout(() => {
//----------------------------unflip the card and continue playing-----------------
          var inner1 = imagecontainer[0].querySelector('.flip-card-inner')
          var inner2 = imagecontainer[1].querySelector('.flip-card-inner')
          inner1.classList.toggle("flip")
          inner2.classList.toggle("flip")
          imagecouple = []
          imagecontainer = []
        }, 1000)
      }
    }
  })
})

// ----------------------Reset Button-----------------------------------
document.querySelector(".reset-button").addEventListener('click', function () {
//lets see what will happen when press rest button
// 1///reset of time and game state
  clearInterval(timerInterval)
  timer = 0
  timerDisplay.textContent = timer
  gameStarted = false
// 2///initialize each card state
    cards.forEach(function (card) {
    var inner = card.querySelector('.flip-card-inner')
    card.style.opacity = "1"
    inner.classList.remove("flip")
    card.classList.remove("matched")
    matchedImages=0
    })
  })



//------------------------ Start Button---------------------------


var start=document.querySelector(".start-button")
start.addEventListener('click', function () {
// 1------------------shuffle each card----------------------
  var imageSrc = [
    "../media/images/machester city.png", "../media/images/real.png", "../media/images/dortmund.png",
    "../media/images/liverpool.png", "../media/images/psg.png", "../media/images/bayern.png",
    "../media/images/machester city.png", "../media/images/real.png", "../media/images/dortmund.png",
    "../media/images/liverpool.png", "../media/images/psg.png", "../media/images/bayern.png"
  ]
  cards.forEach(function (card) {
    var inner = card.querySelector('.flip-card-inner')
    var img = inner.querySelector('.flip-card-back img')
    var randomIndex = Math.floor(Math.random() * imageSrc.length)
    img.src = imageSrc[randomIndex]
    imageSrc.splice(randomIndex, 1) })
//2------------------start the game--------------------------------
  gameStarted = true
  console.log(gameStarted)
//3------------------inilizate timer------------------------------
    clearInterval(timerInterval)
    timer = 0
    timerDisplay.textContent = timer
    if (gameStarted){
    timerInterval = setInterval(function(){
        timer++
        timerDisplay.textContent = timer
    }, 1000)}
})
//----------------------music button--------------------------------
var music = document.getElementById("bg-music")
var musicToggle = document.getElementById("music-toggle")

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play()
    musicToggle.textContent = "Pause Music"
  } else {
    music.pause();
    musicToggle.textContent = "Play Music"
  }
})

