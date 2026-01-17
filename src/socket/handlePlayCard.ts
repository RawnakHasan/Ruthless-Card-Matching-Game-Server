import { isValidPlay } from "@helpers/cards/isValidPlay";
import { playCard } from "@helpers/cards/playCard";
import { turnUpdate } from "@helpers/cards/turnUpdate";
import {
  checkGameFinished,
  checkPlayerElimination,
  getGame,
  getPlayerWithPlayerId,
  sendGameDataToClient,
} from "@helpers/game";
import { CustomSocket } from "@/types";
import { finishPlayer } from "@/lib/finishPlayer";
import { eliminatePlayer } from "@/lib/eliminatePlayer";

export const handlePlayCard = (socket: CustomSocket) => {
  socket.on("playCard", ({ card, roomId }) => {
    const game = getGame(roomId, socket);

    const currentPlayer = getPlayerWithPlayerId(game, socket.id);

    if (currentPlayer.id !== game.playerTurn) {
      socket.emit("errors", "Not your Turn Now");
      return;
    }

    if (currentPlayer.hand.length === 1) {
      if (card.type === "Wild") {
        socket.emit("errors", "You Cannot Play Wild Card in the End");
        return;
      } else if (card.type === "Action") {
        socket.emit("errors", "You Cannot Play Action Card in the End");
        return;
      } else if (
        card.type === "Normal" &&
        (card.name === 0 || card.name === 7)
      ) {
        socket.emit(
          "errors",
          `You Cannot Play Special Normal Card ${card.name} in the End`
        );
        return;
      }
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

    if (currentPlayer.hand.length === 0) {
      finishPlayer(game, currentPlayer);
    } else if (currentPlayer.hand.length > 25) {
      eliminatePlayer(game, currentPlayer);
    }

    turnUpdate(game, card);
    socket.emit("cardPlayed");

    checkPlayerElimination(game, currentPlayer);
    checkGameFinished(game);

    sendGameDataToClient(game, roomId);
  });
};
