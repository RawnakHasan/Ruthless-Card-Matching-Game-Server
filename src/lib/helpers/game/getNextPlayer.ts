import { io } from "@/server";
import type { Game, Player } from "@/types";

export const getNextPlayer = (game: Game): Player => {
  const totalPlayers = game.players.length;

  let index = game.players.findIndex((player) => player.id === game.playerTurn);

  if (index === -1) {
    io.to(game.hostSocketId).emit("errors", "Current player not found");
    return game.players[0];
  }

  let safety = 0;

  do {
    index = (index + game.rotation + totalPlayers) % totalPlayers;
    safety++;
  } while (
    game.players[index].status.type !== "Playing" &&
    safety < totalPlayers
  );

  if (safety >= totalPlayers) {
    io.to(game.hostSocketId).emit("errors", "No active players remaining");
  }

  const nextPlayer = game.players[index];

  return nextPlayer!;
};
