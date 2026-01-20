import { Game } from "@/types";

export const resetGame = (game: Game) => {
  game.deck = [];
  game.discardPile = [];
  game.drawCount = 0;
  game.eliminationCount = 0;
  game.finishCount = 0;
  game.gamePhase = "waiting";
  game.playerTurn = 0;
  game.rotation = 1;

  // Reset all players' hands and status
  game.players.forEach((player) => {
    player.hand = [];
    player.status = { type: "Playing" };
  });

  // Keep the first player as host, set turn to first player
  if (game.players.length > 0) {
    game.hostSocketId = game.players[0].uuid;
    game.players[0].host = true;
    game.playerTurn = game.players[0].id;
  }
};
