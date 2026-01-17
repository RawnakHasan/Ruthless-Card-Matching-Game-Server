import { Game } from "@/types";

export const resetGame = (game: Game) => {
  game.deck = [];
  game.discardPile = [];
  game.drawCount = 0;
  game.eliminationCount = 0;
  game.finishCount = 0;
  // game.gamePhase = "waiting";
  game.playerTurn = 0;
  game.hostSocketId = game.players[0].uuid;
  game.playerTurn = game.players[0].id;
  game.players = [game.players[0]];
  game.rotation = 1;
};
