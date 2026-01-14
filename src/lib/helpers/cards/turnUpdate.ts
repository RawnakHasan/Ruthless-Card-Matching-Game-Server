import { Card, Game } from "@/types";
import { getNextPlayer } from "@helpers/game";

export const turnUpdate = (game: Game, card: Card) => {
  // Determine if turn should advance
  let shouldAdvanceTurn = true;

  if (card.type === "Action") {
    switch (card.name) {
      case "Skip":
        // Skip card effect already sets the turn (skips one player)
        shouldAdvanceTurn = false;
        break;

      case "Skip All":
        // Skip All keeps turn with current player
        shouldAdvanceTurn = false;
        break;

      case "Reverse":
        shouldAdvanceTurn = game.players.length >= 3;
        break;

      // All other action cards advance normally
      case "Draw 2":
      case "Draw 4":
      case "Discard All":
        shouldAdvanceTurn = true;
        break;
    }
  }

  // Wild cards always advance turn to the next player
  // Normal cards always advance turn
  // (shouldAdvanceTurn is already true by default)

  if (shouldAdvanceTurn) {
    const { id: nextPlayerId } = getNextPlayer(game);
    game.playerTurn = nextPlayerId;
  }
};
