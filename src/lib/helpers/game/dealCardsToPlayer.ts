import type { Card, Game } from "../../../types";

export const dealCardsToPlayer = (
  game: Game,
  shuffledDeck: Card[],
  cardPerPlayer: number
) => {
  game.players.forEach(
    (player) => (player.hand = shuffledDeck.splice(0, cardPerPlayer))
  );
};
