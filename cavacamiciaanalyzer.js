function play_hand(playing_deck, opponent_deck, table_deck, turn, remaining_payment) {
  if (!playing_deck) {
    return turn;
  }
  let last_element = playing_deck.shift();
  //aggiungo in testa
  table_deck.unshift(last_element);
  switch (last_element) {
    case 1:
    case 2:
    case 3:
      return play_hand(opponent_deck, playing_deck, table_deck, ++turn, last_element);
      break;
    default:
      if (remaining_payment == 1) {
        opponent_deck = opponent_deck.concat(table_deck);
        return play_hand(opponent_deck, playing_deck, [], ++turn, 1);
      } else {
        return play_hand(playing_deck, opponent_deck, table_deck, turn, --remaining_payment);
      }
      break;

  }
}
