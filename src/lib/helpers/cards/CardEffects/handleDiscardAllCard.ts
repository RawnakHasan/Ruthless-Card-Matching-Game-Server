import type { Card, CardColor, Game } from "../../../../types";
import { getCurrentPlayer } from "../../game";

export const handleDiscardAllCard = (game: Game, color: CardColor) => {
  const currentPlayer = getCurrentPlayer(game);

  const sameColoredCards: Card[] = currentPlayer.hand.filter(
    (card) => card.type !== "Wild" && card.color === color
  );

  if (sameColoredCards.length === 0) return;

  const ids = new Set(sameColoredCards.map((c) => c.id));
  currentPlayer.hand = currentPlayer.hand.filter((card) => !ids.has(card.id));

  game.discardPile.push(...sameColoredCards);
};
