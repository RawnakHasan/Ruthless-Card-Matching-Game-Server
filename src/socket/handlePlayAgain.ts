import { io } from "@/server";
import { getGame, resetGame, sendGameDataToClient } from "@helpers/game";
import { CustomSocket } from "@/types";

export const handlePlayAgain = (socket: CustomSocket) => {
  socket.on("playAgain", ({ roomId }) => {
    const game = getGame(roomId, socket);

    // Only host can restart the game
    if (socket.id !== game.hostSocketId) {
      io.to(socket.id).emit("errors", "Only the host can start a new game");
      return;
    }

    // Must have at least 2 players
    if (game.players.length < 2) {
      io.to(socket.id).emit("errors", "Need at least 2 players to play");
      return;
    }

    // Reset the game state
    resetGame(game);

    // Send updated game state to all clients
    sendGameDataToClient(game, roomId);

    // Notify all players that game has been reset
    io.to(roomId).emit("gameReset", {
      message: "Game has been reset. Ready to play again!",
    });
  });
};
