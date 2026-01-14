import { io } from "@/server";
import type { Game, Player } from "@/types";

export const getNextPlayer = (game: Game): Player => {
  const currentPlayerIndex = game.players.findIndex(
    (player) => player.id === game.playerTurn
  );

  // Calculate next index with wrapping
  // Add game.players.length to handle negative rotation properly
  const nextPlayerIndex =
    (currentPlayerIndex + game.rotation + game.players.length) %
    game.players.length;

  const nextPlayer = game.players[nextPlayerIndex];

  if (!nextPlayer) {
    io.to(game.hostSocketId).emit("errors", "Next Player Not Found!");
  }

  return nextPlayer!;
};
