/*
 * Create a list that holds all of your cards
 *
 */

const listOfCards = ['gem', 'gem', 'paper-plane', 'paper-plane', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'bomb', 'bomb', 'bicycle', 'bicycle', 'leaf', 'leaf']
let removeStars = [];
let cards = document.getElementsByClassName('card');
let openCards = [];
let congratulations = [];
const restartGame = $('.restart');
let deck = $('.deck');
let time = 0;
let moves = $('.moves').html();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function emptyBoard() {
  $('.moves').html(0);
  deck.empty();
  const newCards = shuffle(listOfCards);
  for (let newCard of newCards){
     deck.append('<li class="card"><i class="fa fa-'+ newCard +'"></i></li>')
     console.log(newCard)
  }
  $('.star_1, .star_2, .star_3').addClass('fab fa-jedi-order');
  $('#myModal').addClass('modal')
  congratulations = [];
  removeStars = [];
  addListener()
  stopTimer()
}
emptyBoard();
restartGame.click(emptyBoard)
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
function addListener(){
   for (let card of cards){
     card.addEventListener('click', display(card))
   }
}

function addMyMove(){
    let moving = $('.moves').html();
    moving++;
    $('.moves').html(moving);
    $('.moving').html(moving + ' moves');
    console.log(moving)
}

function display(card){
    return function () {
      card.classList.add('open', 'show')
      openList(card)
      addMyMove()
      removingStars(card)
    }
}

function openList(card){
  openCards.push(card)
  if (openCards.indexOf(card,0)){
    let cardsOpen = openCards.shift();
    let card1 = openCards.pop();
    openCards.length = 0;
    matchCards(card,cardsOpen,card1)
  }
}

function matchCards(card,cardsOpen,card1){
  if (cardsOpen.innerHTML === card1.innerHTML){
    cardsOpen.classList.add('match')
    card1.classList.add('match')
    if (card.classList.contains('open','show','match')){
        congratulations.push(card)
        console.log(congratulations)
        if (congratulations[7]){
          $('#myModal').removeClass('modal')
          document.querySelector('button').addEventListener('click', emptyBoard)
          console.log('yeah')
        }
    }
  }else {
    setTimeout(function(){
    cardsOpen.classList.remove('open','show')
    card1.classList.remove('open', 'show')
  },300);
 }
}

window.addEventListener('click',  timer)

function timer () {
  setInterval(function () {
      let timing = time++;
      $('.seconds').html(timing + ' seconds')
  },1000)
  window.removeEventListener('click',  timer)
}

function stopTimer () {
      clearInterval(timer);
    time = 0;
  }

 function removingStars(card){
   removeStars.push(card)
   if (removeStars[25]){
     $('.information').html('You finished with 2 Stars in' + time + ' seconds and with');
     $('.star_3').removeClass('fab fa-jedi-order');
   }if (removeStars[35]){
     $('.star_2').removeClass('fab fa-jedi-order');
   }if (removeStars[45]){
     $('.star_1').removeClass('fab fa-jedi-order');
     $('.information').html('You finished with No Stars in ' + time + ' seconds and with');
   } else {
     $('.information').html('You finished with 3 stars in ' + time + ' seconds and with');
   }
 }
