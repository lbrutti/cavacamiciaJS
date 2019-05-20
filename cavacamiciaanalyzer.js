function play_hand(playing_deck, opponent_deck, table_deck, turn, remaining_payment, deck1_start, deck2_start) {
  // stop se il giocatore di turno ha finito il mazzo
  if ((playing_deck.length==0 || opponent_deck.length==0)) {
    return turn;
  }
  if (turn > 1 && ((playing_deck.toString() == deck1_start.toString()) && (opponent_deck.toString() == deck2_start.toString()))) {
    console.log("LOOOPPP");
    return "loop!";
  }
  //altrimenti metti sul tavolo la prima carta
  let last_element = playing_deck.shift();
  //aggiungo in testa
  table_deck.unshift(last_element);
  switch (last_element) {
    case 1:
    case 2:
    case 3:
      return play_hand(opponent_deck, playing_deck, table_deck, ++turn, last_element, deck1_start, deck2_start);
      break;
    default:
      if (remaining_payment == 0) {
        opponent_deck = opponent_deck.concat(table_deck);
        console.log("presa");

        table_deck = [];
        return play_hand(opponent_deck, playing_deck, table_deck, ++turn, 1, deck2_start, deck1_start);
      } else {
        console.log("continua...");
        return play_hand(playing_deck, opponent_deck, table_deck, turn, --remaining_payment, deck1_start, deck2_start);
      }
      break;

  }
}

// infinita : 0030202030310000031000100200002000000010

let deck = "0030202030310000031000100200002000000010".split('');
let deck1 = deck.slice(0, 20);
let deck2 = deck.slice(20, 40);
let deck1_start = deck.slice(0, 20);
let deck2_start = deck.slice(20, 40);
debugger;
play_hand(deck1, deck2, [], 0, 1, deck1_start, deck2_start);
