import type { Game } from "../../../types";

export const updatePlayerTurn = (game: Game) => {
  const playerCount = game.players.length;

  game.playerTurn =
    (game.playerTurn + game.rotation + playerCount) % playerCount;
};
