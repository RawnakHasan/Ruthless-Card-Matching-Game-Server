import { Game, Player } from "@/types";

export function eliminatePlayer(game: Game, player: Player) {
  if (player.status.type !== "Playing") return;

  const totalPlayers = game.players.length;

  game.eliminationCount += 1;

  player.status = {
    type: "Eliminated",
    position: totalPlayers - game.eliminationCount + 1,
  };
}
