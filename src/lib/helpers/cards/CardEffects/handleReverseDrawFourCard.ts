import type { Game } from "@/types";

export const handleReverseDrawFourCard = (game: Game) => {
  game.drawCount += 4;
  game.rotation *= -1;
};
