import { eliminatePlayer } from "@/lib/eliminatePlayer";
import { Game, Player } from "@/types";

export function checkPlayerElimination(game: Game, player: Player) {
  if (player.hand.length > 25 && player.status.type === "Playing") {
    eliminatePlayer(game, player);
    game.deck.push(...player.hand);
    player.hand = [];
  }
}
