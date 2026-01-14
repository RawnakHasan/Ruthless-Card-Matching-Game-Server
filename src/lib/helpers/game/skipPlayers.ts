import type { Game, Player } from "../../../types";

export const skipPlayers = (game: Game, playersToSkip: number = 1): Player => {
  const currentIndex = game.players.findIndex((p) => p.id === game.playerTurn);
  const count = game.players.length;

  const nextIndex =
    (currentIndex + (playersToSkip + 1) * game.rotation + count) % count;

  return game.players[nextIndex]!;
};
