import type { Game, Player } from "@/types";

export const skipPlayers = (game: Game, playersToSkip: number = 1): Player => {
  const activePlayers = game.players.filter((p) => p.status.type === "Playing");

  const currentIndex = activePlayers.findIndex((p) => p.id === game.playerTurn);

  if (currentIndex === -1) return undefined; // safety check

  const count = activePlayers.length;
  const nextIndex =
    (currentIndex + (playersToSkip + 1) * game.rotation + count) % count;

  return activePlayers[nextIndex];
};
