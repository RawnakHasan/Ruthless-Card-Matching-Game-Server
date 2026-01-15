import { Games } from "@/games";
import { Game } from "@/types";

export function findGameBySocketId(socketId: string): {
  gameId: string;
  game: Game;
  playerIndex: number;
} | null {
  // gameId is roomId
  for (const [gameId, game] of Games.entries()) {
    const index = game.players.findIndex((p) => p.uuid === socketId);

    if (index !== -1) {
      return { gameId, game, playerIndex: index };
    }
  }

  return null;
}
