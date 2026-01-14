import type { Game } from "@/types";
import { skipPlayers } from "@helpers/game";

export const handleSkipCard = (game: Game) => {
  const skippedPlayer = skipPlayers(game);

  // Update playerTurn to the next player after skipping
  console.log(skippedPlayer.username);
  game.playerTurn = skippedPlayer.id;
};
