/*
Generates a deck of cards
Sebastian Lenton 2013
*/

"use strict";

//globals
var cardValues = [ 'ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king' ];
var suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];

var deckCardOffset = 2;

function Card( suit, value, index ) {
	this.index = index;
	this.suit = suit;
	this.value = value;
	this.flipped = false;
	this.getCardString = function( offset ) {
		return '<div id="card' + this.index + '" style="top:-' + ( offset * deckCardOffset ) + 'px;" class="card ' + this.suit  + '"><p>' + this.value + '</p></div>';
	};
	this.identify = function() {
		return this.suit + ' ' + this.value + ' ' + this.index;
	}
}

function Deck( name ) {
	this.cards = [];
	this.name = name;
	this.generate = function() {
		var counter = 0;
		for( var j = 0; j < suits.length; j++ ) {
			for( var i = 0; i < cardValues.length; i++ ) {
				this.cards.push( new Card( suits[ j ], cardValues[ i ], counter ) );
				//console.log( this.cards[ this.howMany( true ) ].identify() );
			}
		}
	};
	this.shuffle = function() {
		this.cards = shuffle( this.cards );
	};
	this.howMany = function( countFromZero ) {
		var length = this.cards.length;
		if( countFromZero ) {
			return length - 1;
		} else {
			return length;
		}
	};
	this.passCards = function( deck, amount ) {							//could merge passcard and passcards
		if( !amount ) {
			amount = 1;
		}
		for( var i = 0; i < amount; i++ ) {
			var cardToPass = this.cards.pop();
			deck.cards.push( cardToPass );
		}
	}
	this.renderAll = function() {										//this should be deleted and inherited from Deck
		var deckString = '';
		for( var j = 0; j < this.cards.length; j++ ) {
			deckString += this.cards[ j ].getCardString( j );
		}
		deckString = '<div id="deck' + this.name + '" class="deck">' + deckString + '</div>';
		$( 'body' ).append( deckString );
	}
}

var deck = new Deck( 'DefaultDeck' );
var startDeck = new Deck( 'StartDeck' );
var eggDeck = new Deck( 'EggDeck' );

deck.generate();

deck.passCards( eggDeck, 20 );
//deck.passCards( startDeck );			//need to stop too large amounts throwing errors

deck.renderAll();
startDeck.renderAll();
eggDeck.renderAll();

$( '.card' ).click( function() {
	console.log( 'clicked;' );
	
	$( this ).toggleClass( 'flipped' );
} )


/*********************
HELPERS
*********************/


function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = (Math.random() * counter--) | 0;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}