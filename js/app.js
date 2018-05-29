
// Created a list that holds all cards and some global variables

let listOfCards = ['gem', 'gem', 'paper-plane', 'paper-plane', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'bomb', 'bomb', 'bicycle', 'bicycle', 'leaf', 'leaf'];
let Cards = document.getElementsByClassName('card');
let Deck = $('.deck');
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

function emptyBoard () {
    $('.moves').html(0 + ' moves');
    Deck.empty();
    let newCards = shuffle(listOfCards);
    for (let newCard of newCards) {
       Deck.append('<li class="card hide"></div><i class="fa fa-' + newCard + '"></li>');
       console.log(newCard);
    }
    $('.star_1, .star_2, .star_3').addClass('fab fa-jedi-order');
    $('#myModal').addClass('modal');
    congratulations = [];
    removeStars = [];
    openCards = [];
    addListener();
    time = 0;
    Deck.one('click' , timer);
}

// Runs when page loads or reloads

emptyBoard();

/*
* A click on the restart logo and jedi-order font icon
* restarts the game and timer
*/

$('.restart, .finished').click( function () {
    clearInterval(myInterval);
    myInterval = -1;
    time = 0;
    $('.seconds').html(time + ' seconds');
    emptyBoard();
})

//Start the timer as soon as you click on a card

Deck.one('click' , timer);

function timer () {
    clearInterval(myInterval);
    myInterval = setInterval(function () {
        time++;
        $('.seconds').html(time + ' seconds');
    },1000);
}

//Add an events listener for all the cards

function addListener() {
    for (let Card of Cards) {
        Card.addEventListener('click', display(Card));
    }
}


//Displays the cards

function display (Card) {
    return function () {
        Card.classList.add('open', 'show');
        openList(Card);
        addMyMove(Card);
        removingStars(Card);
    }
}

//Adds the cards to an array

function openList (Card) {
    //if the card contains hide add to openCards
    if (Card.classList.contains('hide')) {
    openCards.push(Card);
        //Splits the first and second card of the array into two seperate arrays
        if (openCards.indexOf(Card,0)) {
            let cardsOpen = openCards.shift();
            let card1 = openCards.pop();
            //Then clears it
            openCards.length = 0;
            matchCards(Card,cardsOpen,card1);
        }
    }
}

//Compares the two arrays

function matchCards (Card,cardsOpen,card1) {
    //If the two arrays are equel add the class match
    if (cardsOpen.innerHTML === card1.innerHTML){
        cardsOpen.classList.add('match');
        card1.classList.add('match');
        //if the card contains hide add it to the congratulations array
        if (Card.classList.contains('hide')) {
            congratulations.push(Card);
            console.log(congratulations);
            //If the array contains 8 cards display congrats screen
            if (congratulations[7]) {
                $('#myModal').removeClass('modal');
                console.log('yeah');
            }
        }
    }else {
        //if cards don't match hide cards
        setTimeout(function () {
            cardsOpen.classList.remove('open','show');
            cardsOpen.classList.add('hide');
            card1.classList.remove('open', 'show');
            card1.classList.add('hide');
        },600);
    }
}

//Records the moves and adds them to the page and congrats screen

function addMyMove(Card) {
    let hiddenCards = Card.classList.contains('hide');
    if (hiddenCards) {
        let moving = parseInt($('.moves').html());
        ++moving;
        console.log(moving);
        //Adds moves to page
        $('.moves').html(moving + ' moves');
        //Adds moves to congrats screen
        $('.moving').html(moving  + ' moves');
        //Put cards into an array
        removeStars.push(hiddenCards);
        //Remove hide so when clicked again it will not be put in removeStars array
        Card.classList.remove('hide');
    }
}

//Remove a star after a certain amount of moves are made and add it to the congrats screen

function removingStars () {
    if (removeStars.length >= 26) {
        $('.star_3').removeClass('fab fa-jedi-order');
        $('.information').html('You finished with 2 Stars in ' + time + ' seconds and with');
        if (removeStars.length >= 36) {
            $('.star_2').removeClass('fab fa-jedi-order');
            $('.information').html('You finished with 1 Star in ' + time + ' seconds and with');
            if (removeStars.length >= 46) {
                $('.star_1').removeClass('fab fa-jedi-order');
                $('.information').html('You finished with No Stars in ' + time + ' seconds and with');
            }
        }
    } else {
        $('.information').html('You finished with 3 stars in ' + time + ' seconds and with');
    }
}
