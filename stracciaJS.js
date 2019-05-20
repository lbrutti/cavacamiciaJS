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
 * @param {array} giocatore_1 : mazzo del primo giocatore
 * @param {array} giocatore_2 : mazzo del secondo giocatore
 * @param {array} table_deck : mazzo in tavola
 * @param {int} turn : turno di gioco
 * @param {int} remaining_payment : carte da scartare
 * @param {array} playing_deck_start : configurazione iniziale del mazzo del primo giocatore
 * @param {array} opponent_deck_start :  configurazione iniziale del mazzo del secondo giocatore
 */
function play_hand(giocatore_1, giocatore_2, table_deck, turn, remaining_payment, playing_deck_start, opponent_deck_start) {
  console.log("//////////////////////");
  console.log("Nuova mano:", turn);
  console.log(giocatore_1.nome, " - mazzo = ", giocatore_1.mazzo.toString());
  console.log(giocatore_2.nome, " - mazzo = ", giocatore_2.mazzo.toString());
  // stop se il giocatore di turno ha finito il mazzo
  if ((giocatore_1.mazzo.length == 0 || giocatore_2.mazzo.length == 0)) {
    console.log("fine!", turn);
    return turn;
  }
  //stop se sono in loop
  if (turn > 1 && ((giocatore_1.mazzo.toString() == playing_deck_start.toString()) && (giocatore_2.mazzo.toString() == opponent_deck_start.toString()))) {
    console.log("LLLOOOOOOPPP");
    return "loop!";
  }
  //altrimenti metti sul tavolo la prima carta
  let last_element = Number(giocatore_1.mazzo.shift());
  //aggiungo in testa
  table_deck.unshift(last_element);
  console.log("table_deck : ", table_deck);
  switch (last_element) {
    case 1:
    case 2:
    case 3:
      console.log("Giocata carta potente : ", last_element);
      //passo la mano all'avversario
      return play_hand(giocatore_2, giocatore_1, table_deck, ++turn, last_element, opponent_deck_start, playing_deck_start);
    default:
      console.log("Giocata carta neutra : ", last_element);
      //se non ci sono piu' carte da buttare:
      //l'avversario ruba il mazzo, lo gira e 
      //lo mette sotto il suo capovolgendolo (carte a faccia in giu')
      if (remaining_payment == 0) {
        table_deck = table_deck.reverse();
        giocatore_2.mazzo = giocatore_2.mazzo.concat(table_deck);
        table_deck = [];
        return play_hand(giocatore_2, giocatore_1, table_deck, ++turn, 1, opponent_deck_start, playing_deck_start);
      } else {
        return play_hand(giocatore_1, giocatore_2, table_deck, turn, --remaining_payment, playing_deck_start, opponent_deck_start);
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
let giocatore_1 = {'nome':'Gianni', 'mazzo':deck1};
let giocatore_2 = {'nome':'Franco', 'mazzo':deck2};
play_hand(giocatore_1, giocatore_2, [], 0, 1, deck1_start, deck2_start);

