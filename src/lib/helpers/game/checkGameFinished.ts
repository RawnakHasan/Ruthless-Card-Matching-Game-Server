import { finishPlayer } from "@/lib/finishPlayer";
import { Game } from "@/types";

export function checkGameFinished(game: Game) {
  const activePlayers = game.players.filter((p) => p.status.type === "Playing");

  if (activePlayers.length <= 1) {
    activePlayers.forEach((p) => finishPlayer(game, p));
    game.gamePhase = "finished";
  }
}
