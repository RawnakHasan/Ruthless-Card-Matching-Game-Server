import type { Card, Game } from "../../../types";
import { getTopCard } from "../game";
import { isDrawCard } from "./isDrawCard";
import { canStackOn } from "./canStackOn";

export const isValidPlay = (game: Game, playedCard: Card): boolean => {
  const topCard = getTopCard(game);

  // 🔒 ACTIVE DRAW PENALTY CHECK
  // Only enforce draw lock if there's an ACTIVE penalty (drawCount > 0)
  if (game.drawCount > 0) {
    // Player MUST either draw or stack another draw card
    if (!isDrawCard(playedCard)) {
      return false; // Can't play normal cards when draw penalty is active
    }

    // If they're playing a draw card, it must be stackable on the top card
    return canStackOn(topCard, playedCard);
  }

  // 🎴 NORMAL VALIDATION (no active draw penalty)
  // At this point, drawCount is 0, so normal rules apply

  // Match by name
  if (String(topCard.name) === String(playedCard.name)) return true;

  // Wild cards can always be played
  if (playedCard.type === "Wild") return true;

  // Match by color
  const topColor =
    topCard.type === "Wild" ? topCard.chosenColor : topCard.color;

  return !!topColor && topColor === playedCard.color;
};
