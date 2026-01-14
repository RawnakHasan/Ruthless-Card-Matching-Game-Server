import {
  getCurrentPlayer,
  getGame,
  sendGameDataToClient,
} from "../lib/helpers/game";
import { CustomSocket } from "../types";

export const handleSevensSwapSocket = (socket: CustomSocket) => {
  socket.on("swapHands", ({ roomId, targetPlayerId }) => {
    const game = getGame(roomId, socket);

    const currentPlayer = getCurrentPlayer(game);
    if (socket.id !== game.hostSocketId) {
      socket.emit("errors", "Not Your turn");
      return;
    }

    const targetPlayer = game.players[targetPlayerId];

    if (!targetPlayer) {
      socket.emit("errors", "Target Player Doesn't exist");
      return;
    }

    const tempHand = targetPlayer.hand;
    targetPlayer.hand = currentPlayer.hand;
    currentPlayer.hand = tempHand;

    sendGameDataToClient(game, roomId);
  });
};
