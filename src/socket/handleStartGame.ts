import { io } from "..";
import {
  dealCardsToPlayer,
  fisherYatesShuffle,
  generateDeck,
  getGame,
  sendGameDataToClient,
} from "../lib/helpers/game";
import { CustomSocket } from "../types";

export const handleStartGame = (socket: CustomSocket) => {
  socket.on("startGame", ({ roomId }) => {
    // Gets the Game Obj with roomId given from client
    const game = getGame(roomId, socket);

    // If the requester isn't the host then game doesn't start
    if (socket.id !== game.hostSocketId) {
      io.to(socket.id).emit("errors", "You Aren't the Host");
      return;
    }

    // If only the host is present and no other player the game doesn't start
    if (game.players.length < 2) {
      io.to(socket.id).emit("errors", "Who are ya going to play with");
      return;
    }

    // generateDeck() function generates a full deck of UNO No Mercy Cards and Uses Fisher Yates Algorithm to shuffle them
    const shuffledDeck = fisherYatesShuffle(generateDeck());

    // Game Phase changes for updates in client
    game.gamePhase = "playing";

    // Card are dealed to players
    dealCardsToPlayer(game, shuffledDeck, 7);

    // First card from the deck is inserted into the discard Pile & rest of the cards are assigned to deck Pile
    const topCard = shuffledDeck.shift()!;
    game.discardPile = [topCard];
    game.deck = shuffledDeck;

    // Game Data gets send to the client
    sendGameDataToClient(game, roomId);
  });
};
