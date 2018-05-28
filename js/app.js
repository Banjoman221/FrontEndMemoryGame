
// Created a list that holds all cards and some global variables
const listOfCards = ['gem', 'gem', 'paper-plane', 'paper-plane', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'bomb', 'bomb', 'bicycle', 'bicycle', 'leaf', 'leaf']
let cards = document.getElementsByClassName('card');
let deck = $('.deck');
let time = 0;
let myInterval = -1;
let openCards = [];
let congratulations = [];
let removeStars = [];

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


//function that is called to clear everything and add the cards and stars back
function emptyBoard() {
  $('.moves').html(0);
  deck.empty();
  const newCards = shuffle(listOfCards);
  for (let newCard of newCards){
     deck.append('<li class="card hide"></div><i class="fa fa-'+ newCard +'"></li>')
     console.log(newCard)
  }
  $('.star_1, .star_2, .star_3').addClass('fab fa-jedi-order');
  $('#myModal').addClass('modal')
  congratulations = [];
  removeStars = [];
  openCards = [];
  addListener()
  time = 0;
  deck.one('click' , timer)
}
emptyBoard();

//A click on the restart logo and jedi-order font icon restarts the game
$('.restart, .finished').click( function () {
  clearInterval(myInterval);
  myInterval = -1;
  time = 0;
  $('.seconds').html(time + ' seconds')
  emptyBoard()
})

//Start the timer as soon as you click on a card
deck.one('click' , timer)

function timer () {
clearInterval(myInterval)
  myInterval = setInterval(function () {
  time++;
  $('.seconds').html(time + ' seconds')
},1000)
}

//Add an events listener for all the cards
function addListener(){
   for (let card of cards){
     card.addEventListener('click', display(card))
   }
}

//Records the moves and adds them to the page
function addMyMove(card){
  let hiddenCards = card.classList.contains('hide', 'card')
    if(hiddenCards){
      let moving = $('.moves').html();
      moving++;
      //adds moves to page
      $('.moves').html(moving)
      //adds moves to congrats
      $('.moving').html(moving + ' moves');
      removeStars.push(hiddenCards)
      card.classList.remove('hide')
  }
}

//Displays the cards
function display(card){
    return function () {
      card.classList.add('open', 'show')
      openList(card)
      addMyMove(card)
      removingStars(card)
    }
}

//Adds the cards to anrray
function openList(card){
  openCards.push(card)
  //Split the first and second array into two seperate arrays
  if (openCards.indexOf(card,0)){
    let cardsOpen = openCards.shift();
    let card1 = openCards.pop();
    //Then clears it
    openCards.length = 0;
    matchCards(card,cardsOpen,card1)
  }
}

//Compares the two arrays
function matchCards(card,cardsOpen,card1){
  //If the two arrays are equel add the class match
  if (cardsOpen.innerHTML === card1.innerHTML){
    cardsOpen.classList.add('match')
    card1.classList.add('match')
    //if the card contains hide add it to the congratulations array
    if (card.classList.contains('hide')){
    congratulations.push(card)
    console.log(congratulations)
        //If the array contains 8 cards display congrats screen
        if (congratulations[7]){
          $('#myModal').removeClass('modal')
          console.log('yeah')
        }
    }
  }else {
    //if cards don't match hide cards
    setTimeout(function(){
    cardsOpen.classList.remove('open','show')
    cardsOpen.classList.add('hide')
    cardsOpen.classList.remove('open','show')
    card1.classList.remove('open', 'show')
    card1.classList.add('hide')
  },600);
 }
}

//Remove a star after a certain amount of moves are made and add it to the congrats screen
 function removingStars(card){
      if (removeStars.length >= 25){
          $('.star_3').removeClass('fab fa-jedi-order');
          $('.information').html('You finished with 2 Stars in ' + time + ' seconds and with');
          if (removeStars.length >= 35){
              $('.star_2').removeClass('fab fa-jedi-order');
              $('.information').html('You finished with 1 Star in ' + time + ' seconds and with');
              if (removeStars.length >= 45  ){
                  $('.star_1').removeClass('fab fa-jedi-order');
                  $('.information').html('You finished with No Stars in ' + time + ' seconds and with');
              }
          }
      } else {
     $('.information').html('You finished with 3 stars in ' + time + ' seconds and with');
      }
}
