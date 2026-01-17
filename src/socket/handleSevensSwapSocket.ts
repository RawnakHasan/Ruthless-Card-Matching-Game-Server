import {
  checkGameFinished,
  checkPlayerElimination,
  getCurrentPlayer,
  getGame,
  sendGameDataToClient,
} from "@helpers/game";
import { CustomSocket } from "@/types";

export const handleSevensSwapSocket = (socket: CustomSocket) => {
  socket.on("swapHands", ({ roomId, targetPlayerId, card }) => {
    const game = getGame(roomId, socket);

    const currentPlayer = getCurrentPlayer(game);
    if (currentPlayer.id !== game.playerTurn) {
      socket.emit("errors", "Not Your turn");
      return;
    }

    if (currentPlayer.hand.length === 1) {
      socket.emit("errors", "You cannot Play 7's Swap on Last");
    }

    const targetPlayer = game.players[targetPlayerId];

    if (!targetPlayer) {
      socket.emit("errors", "Target Player Doesn't exist");
      return;
    }

    currentPlayer.hand = currentPlayer.hand.filter((c) => c.id !== card.id);

    [targetPlayer.hand, currentPlayer.hand] = [
      currentPlayer.hand,
      targetPlayer.hand,
    ];

    checkPlayerElimination(game, currentPlayer);
    checkGameFinished(game);

    sendGameDataToClient(game, roomId);
  });
};
