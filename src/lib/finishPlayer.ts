import { Game, Player } from "@/types";

export function finishPlayer(game: Game, player: Player) {
  if (player.status.type !== "Playing") return;

  game.finishCount += 1;

  player.status = {
    type: "Finished",
    position: game.finishCount,
  };
}
