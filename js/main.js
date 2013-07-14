/*
Generates a deck of cards
Sebastian Lenton 2013
*/

"use strict";

//globals
var cardValues = [ 'ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king' ];
var suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];

function Card( suit, value ) {
	this.suit = suit;
	this.value = value;
	this.flipped = true;
	this.render = function() {
		$( 'body' ).append( '<div class="card ' + this.suit  + '"><p>' + this.value + '</p></div>' );
	
		console.log( 'The ' + this.value + ' of ' + this.suit );
	};
}

function Deck() {
	this.cards = [];
	this.generate = function() {
		for( var j = 0; j < suits.length; j++ ) {
			for( var i = 0; i < cardValues.length; i++ ) {
				this.cards.push( new Card( suits[ j ], cardValues[ i ] ) );
			}
		}
	};
	this.shuffle = function() {
		this.cards = shuffle( this.cards );
	};
	this.howMany = function() {
		return this.cards.length;
	};
	this.renderAll = function() {
		for( var j = 0; j < this.cards.length; j++ ) {
			this.cards[ j ].render();
		}
	}
}

var deck = new Deck();
deck.generate();
deck.shuffle();
deck.renderAll();

$( '.card' ).click( function() {
	console.log( 'clicked;' );
	
	$( this ).toggleClass( 'flipped' );
} )

/*$(document).ready(function($) {

};*/






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