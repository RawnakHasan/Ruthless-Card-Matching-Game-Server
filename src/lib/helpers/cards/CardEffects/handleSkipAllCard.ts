import type { Game } from "@/types";

export const handleSkipAllCard = (game: Game) => {
  game.playerTurn = game.playerTurn;
};
