import { Games } from "@/games";
import { findGameBySocketId } from "@helpers/game/findGameBySocketId";
import { CustomSocket } from "@/types";
import { sendGameDataToClient, updatePlayerTurn } from "@/lib/helpers/game";

export const handleDisconnect = (socket: CustomSocket) => {
  socket.on("disconnect", () => {
    console.log(`User with socketId ${socket.id} got disconnected`);

    const result = findGameBySocketId(socket.id);
    if (!result) return;

    const { gameId: roomId, game, playerIndex } = result;
    const player = game.players[playerIndex];

    // Return cards
    game.deck.push(...player.hand);
    player.hand = [];

    // Remove player
    game.players.splice(playerIndex, 1);

    game.players.forEach((player, index) => {
      player.id = index;
    });

    // Fix turn
    if (playerIndex <= game.playerTurn) {
      game.playerTurn--;
    }

    game.playerTurn = Math.max(
      0,
      Math.min(game.playerTurn, game.players.length - 1)
    );

    // Handle empty game
    if (game.players.length === 0) {
      Games.delete(roomId);
      return;
    }

    // Host migration
    if (socket.id === game.hostSocketId) {
      game.players[0].host = true;
      game.hostSocketId = game.players[0].uuid;
    }

    if (game.players.length < 2) {
      game.gamePhase = "waiting";
      game.discardPile = [];
      game.deck = [];
      game.drawCount = 0;
      game.rotation = 1;
      game.playerTurn = 0;
    }

    updatePlayerTurn(game);
    sendGameDataToClient(game, roomId);
  });
};
