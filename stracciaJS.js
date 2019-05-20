/*jshint esversion:6*/
function permute(permutation) {
  var length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/**
 * Simula una partita di straccia camicia secondo queste regole:
 * 
 * il giocatore corrente mette la prima carta del suo mazzo sul tavolo
 * il turno passa al giocatore successivo
 * il successivo mette la sua carta
 * 
 * 
 * @param {array} playing_deck : mazzo del primo giocatore
 * @param {array} opponent_deck : mazzo del secondo giocatore
 * @param {array} table_deck : mazzo in tavola
 * @param {int} turn : turno di gioco
 * @param {int} remaining_payment : carte da scartare
 * @param {array} playing_deck_start : configurazione iniziale del mazzo del primo giocatore
 * @param {array} opponent_deck_start :  configurazione iniziale del mazzo del secondo giocatore
 */
function play_hand(playing_deck, opponent_deck, table_deck, turn, remaining_payment, playing_deck_start, opponent_deck_start) {
  // stop se il giocatore di turno ha finito il mazzo
  if ((playing_deck.length == 0 || opponent_deck.length == 0)) {
    console.log(playing_deck.toString());
    console.log(opponent_deck.toString());
    console.log("fine!", turn);
    return turn;
  }
  //stop se sono in loop
  if (turn > 1 && ((playing_deck.toString() == playing_deck_start.toString()) && (opponent_deck.toString() == opponent_deck_start.toString()))) {

    console.log("LLLOOOOOOPPP");
    console.log(playing_deck.toString());
    console.log(deck1_start.toString());
    console.log(opponent_deck.toString());
    console.log(deck2_start.toString());
    return "loop!";
  }
  //altrimenti metti sul tavolo la prima carta
  let last_element = Number(playing_deck.shift());
  //aggiungo in testa
  table_deck.unshift(last_element);
  switch (last_element) {
    case 1:
    case 2:
    case 3:
      console.log("Giocata carta potente : ", last_element);
      console.log(playing_deck.toString());
      console.log(opponent_deck.toString());
      return play_hand(opponent_deck, playing_deck, table_deck, ++turn, last_element, opponent_deck_start, playing_deck_start);
    default:
      console.log("Giocata carta neutra : ", last_element);
      if (remaining_payment == 0) {
        opponent_deck = opponent_deck.concat(table_deck);
        table_deck = [];
        return play_hand(opponent_deck, playing_deck, table_deck, ++turn, 1, opponent_deck_start, playing_deck_start);
      } else {
        return play_hand(playing_deck, opponent_deck, table_deck, turn, --remaining_payment, playing_deck_start, opponent_deck_start);
      }

  }
}


// infinita : 0030202030310000031000100200002000000010

let deckString = "0030202030310000031000100200002000000010";
let deck = deckString.split('');

let deck1 = deck.slice(0, 20);
let deck2 = deck.slice(20, 40);
let deck1_start = deck.slice(0, 20);
let deck2_start = deck.slice(20, 40);
console.log("mazzo 1: ", deck1.toString());
console.log("mazzo 2: ", deck2.toString());
play_hand(deck1, deck2, [], 0, 1, deck1_start, deck2_start);

