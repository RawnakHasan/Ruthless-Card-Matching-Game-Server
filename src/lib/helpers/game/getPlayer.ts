import { io } from "@/server";
import type { Game, Player } from "@/types";

export const getPlayerWithUsername = (game: Game, username: string): Player => {
  const playerWithUsername = game.players.find(
    (player) => player.username === username
  );

  if (!playerWithUsername) {
    io.to(game.hostSocketId).emit(
      "errors",
      `Player with username: ${username} not found`
    );
  }

  return playerWithUsername!;
};

export const getPlayerWithPlayerId = (game: Game, socketId: string): Player => {
  const playerWithSocketId = game.players.find(
    (player) => player.uuid === socketId
  );

  if (!playerWithSocketId) {
    io.to(game.hostSocketId).emit(
      "errors",
      `Player with username: ${socketId} not found`
    );
  }

  return playerWithSocketId!;
};

export const getCurrentPlayer = (game: Game): Player => {
  const currentPlayer = game.players.find(
    (player) => player.id === game.playerTurn
  );

  if (!currentPlayer) {
    io.to(game.hostSocketId).emit("errors", "Player not Found");
  }

  return currentPlayer!;
};
