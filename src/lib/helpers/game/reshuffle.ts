import type { Game } from "../../../types";
import { fisherYatesShuffle } from "./fisherYatesShuffle";

export const reshuffle = (game: Game) => {
  // Keep the top card, shuffle the rest back into the deck
  const topCard = game.discardPile.shift()!;

  // Clear chosenColor from wild cards before reshuffling
  const cardsToShuffle = game.discardPile.map((card) => {
    if (card.type === "Wild") {
      return { ...card, chosenColor: null };
    }
    return card;
  });

  game.deck = fisherYatesShuffle(cardsToShuffle);
  game.discardPile = [topCard];
};
