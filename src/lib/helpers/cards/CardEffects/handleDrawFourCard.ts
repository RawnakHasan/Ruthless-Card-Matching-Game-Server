import type { Game } from "@/types";

export const handleDrawFourCard = (game: Game) => {
  game.drawCount += 4;
};
