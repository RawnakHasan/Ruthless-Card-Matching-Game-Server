import { io } from "../../..";
import type { Card, Game } from "../../../types";

export const getTopCard = (game: Game): Card => {
  const topCard = game.discardPile[game.discardPile.length - 1];

  if (!topCard) {
    io.to(game.hostSocketId).emit("errors", "No Cards In Discard Pile");
  }

  return topCard!;
};
