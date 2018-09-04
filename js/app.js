/*I got help by Mike Wales on the FEND webinar*/
/*The list that holds all of my cards*/
const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
/*returns html*/
function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function initGame() {
  startTimer();
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join('');

  let allCards = document.querySelectorAll('.card');
  let openCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if (
      !card.classList.contains('open') &&
      !card.classList.contains('show') &&
      !card.classList.contains('match')
    ) {
      openCards.push(card);
      card.classList.add('open', 'show');

      if (openCards.length == 2) {
        moveCount();
        /*if cards match*/
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[0].classList.add('open');
          openCards[0].classList.add('show');

          openCards[1].classList.add('match');
          openCards[1].classList.add('open');
          openCards[1].classList.add('show');

          openCards = [];

          winGame();

        } else {
          /*If cards don't match*/
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            openCards = [];
          }, 1100);
        }
      }
    }
  });
});

/*timer*/
let timer = document.querySelector('.timer');
let second = 0;
let interval;


function startTimer() {
    time = setInterval(function () {
          timer.innerHTML = second + " seconds";
            second++;
        }, 1100);
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(function() {
  }, 1100);
}

document.querySelector('.restart').addEventListener('click', resetTimer);

/*counting moves*/
let moves = 0;
let moveCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars');

function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
/*removing stars*/
  if (moves > 15 && moves < 21) {
  document.getElementById('first').style.display = "none";
}
else if (moves > 22) {
  document.getElementById('second').style.display = "none";
}
}
};

let modal = document.querySelector('.modal');
let matchedCards = document.getElementsByClassName('match');

function winGame() {
  if (matchedCards.length === 16) {
    modal.style.display= "block";
clearInterval(time);
}
}
  /*modal from w3schools.com*/

  /* Get the <span> element that closes the modal*/
  let span = document.getElementsByClassName("close")[0];

  /* When the user clicks on <span> (x), close the modal*/
  span.onclick = function() {
      modal.style.display = "none";
  };

  /* When the user clicks anywhere outside of the modal, close it*/
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
    let theMoves = document.getElementById('moves');
    document.getElementById('finMoves').innerHTML=theMoves.innerHTML;

let theTime = document.getElementById('timer');
      document.getElementById('finTime').innerHTML = theTime.innerHTML;
let theStars = document.getElementById('stars');
      document.getElementById('finStars').innerHTML = theStars.innerHTML;
};

let moves = document.querySelector('.moves');

/*Play again*/
document.querySelector('.button').addEventListener('click', playAgain);
document.querySelector('.restart').addEventListener('click', playAgain);

function playAgain() {
  modal.style.display = "none";
  moves.innerHTML = 0;
  initGame();
}

initGame();
