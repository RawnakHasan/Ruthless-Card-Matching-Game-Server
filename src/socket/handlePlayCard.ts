import { isValidPlay } from "../lib/helpers/cards/isValidPlay";
import { playCard } from "../lib/helpers/cards/playCard";
import { turnUpdate } from "../lib/helpers/cards/turnUpdate";
import {
  getGame,
  getPlayerWithPlayerId,
  sendGameDataToClient,
} from "../lib/helpers/game";
import { CustomSocket } from "../types";

export const handlePlayCard = (socket: CustomSocket) => {
  socket.on("playCard", ({ card, roomId }) => {
    const game = getGame(roomId, socket);

    const currentPlayer = getPlayerWithPlayerId(game, socket.id);

    if (currentPlayer.id !== game.playerTurn) {
      socket.emit("errors", "Not your Turn Now");
      return;
    }

    if (card.type === "Wild" && !card.chosenColor) {
      socket.emit("errors", "Wild card must have a chosen color");
      return;
    }

    if (!isValidPlay(game, card)) {
      socket.emit("errors", "Card is not valid");
      return;
    }

    playCard(currentPlayer, game, card);
    turnUpdate(game, card);

    sendGameDataToClient(game, roomId);
  });
};
