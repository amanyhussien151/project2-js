//تعريف الداله
(function() {
    var timerText = document.getElementsByClassName("timer")[0];
    var timerStart = document.getElementsByClassName("timer__start")[0];
    var game = document.getElementsByClassName("game")[0];
    var restart = document.getElementsByClassName("restart")[0];
    var success = document.getElementsByClassName("success")[0];
    var movesText = document.getElementsByClassName("moves")[0];
    var stars = document.getElementsByClassName("stars")[0].children;
    var resetSuccess = document.getElementsByClassName("success__reset")[0];
    var starsSuccess = document.getElementsByClassName("success__stars")[0];

    var openCards = [];
    var matchedCards = [];
    var starsAmt = 3;
    var seconds = 0;
    var clicks = 0;
    var moves = 0;
    var minutes = 0;
    var hours = 0;
    var cards = [
      '<i class="fa-solid fa-bomb"></i>',
      '<i class="fa-brands fa-facebook"></i>',
      '<i class="fa-brands fa-twitter"></i>',
      '<i class="fa-brands fa-apple"></i>',
      '<i class="fa-solid fa-headphones"></i>',
      '<i class="fa-solid fa-thumbs-up"></i>',
      '<i class="fa-brands fa-twitter"></i>',
      '<i class="fa-solid fa-palette"></i>',
      '<i class="fa-solid fa-bomb"></i>',
      '<i class="fa-regular fa-lemon"></i>',
      '<i class="fa-solid fa-thumbs-up"></i>',
      '<i class="fa-regular fa-lemon"></i>',
      '<i class="fa-brands fa-apple"></i>',
      '<i class="fa-solid fa-palette"></i>',
      '<i class="fa-brands fa-facebook"></i>',
      '<i class="fa-solid fa-headphones"></i>'
    ];



    

  //اختيار قيم عشوائي  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
    
  }

  //timer
  function startTimer() {
    t = setInterval(() => {
      seconds = (seconds + 1) % 60;
      if (seconds === 0) {
        minutes = (minutes + 1) % 60;
        if (minutes === 0) {
          hours++;
        }
      }
  
      }, 100);
  }
  
//المسؤل عن عدد الضغطات لو زي بعض يزيد moveواحد
  function incrementMoves() {
    clicks++;

    if (clicks % 2 === 0) {
      moves++;
      movesText.innerHTML = moves;
    }
  }


  function lockCard(el) {
    el.classList.add("match");
    matchedCards.push(el);
  }
//error
  function resetCard(el) {
    el.classList.remove("show", "open");
    el.classList.add("error");

    setTimeout(() => el.classList.remove("error"), 1000);
}

//لما اعمل rester
  function restartGame() {
    
    openCards.length = 0;
    matchedCards.length = 0;
    clicks = 0;
    moves = 0;

    
    clearTimeout(t);
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerText.textContent = "0:00:00";
    movesText.innerHTML = moves;
    for (star of stars) {
      star.children[0].className = "fa fa-star";
    }

    game.innerHTML = "";
    shuffle(cards);
    appendCards();
  }
//يعرض الوقت والنجوم
function showSuccess() {
  timeSuccess.innerHTML = timerText.innerHTML;
  starsSuccess.innerHTML = starsAmt;

  success.classList.toggle("is-hidden", false);
  success.classList.toggle("is-flex-visible", true);

  resetSuccess.onclick = () => {
      restartGame();
      success.classList.toggle("is-flex-visible", false);
      success.classList.toggle("is-hidden", true);
  };
}

//زياده عدد الحركات
function showCard() {
  incrementMoves();
  this.classList.add("show", "open");
  openCards.push(this);

  if (openCards.length === 2) {
      handleCardMatch();
      openCards = []; 
  }

  updateStars();
  if (matchedCards.length === 16) {
      setTimeout(showSuccess, 700);
  }
}

function handleCardMatch() {
  const [card1, card2] = openCards;
  if (card1.firstChild.className === card2.firstChild.className) {
      lockCard(card1);
      lockCard(card2);
  } else {
      resetCard(card1);
      resetCard(card2);
  }
}

function updateStars() {
  if (moves === 6) {
      updateStar(2, "fa fa-star-o");
      starsAmt = 2;
  } else if (moves === 13) {
      updateStar(1, "fa fa-star-o");
      starsAmt = 1;
  } else if (moves === 20) {
      updateStar(0, "fa fa-star-o");
      starsAmt = 0;
  }
}

function updateStar(index, className) {
  stars[index].children[0].className = className;



    // بتحقق
    if (matchedCards.length === 16) {
      setTimeout(function() {
        showSuccess();
      }, 700);
    }
  }
//تكررار
  function appendCards() {
    for (card of cards) {
      let cardEl = document.createElement("LI");
      cardEl.classList.add("card");
      cardEl.innerHTML = card;

      game.appendChild(cardEl);

      cardEl.addEventListener("click", showCard);
    }
  }
//بينظيم
  function initializeGame() {
    updateMovesDisplay();
    setupEventListeners();
    shuffleAndDisplayCards();
}

function updateMovesDisplay() {
    movesText.textContent = moves;
}

function setupEventListeners() {
    timerStart.addEventListener("click", startTimer);
    restart.addEventListener("click", restartGame);
}

function shuffleAndDisplayCards() {
    shuffle(cards);
    appendCards();
}

initializeGame();

})();

