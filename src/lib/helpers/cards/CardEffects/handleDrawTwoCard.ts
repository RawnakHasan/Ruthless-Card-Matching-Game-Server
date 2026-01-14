import type { Game } from "@/types";

export const handleDrawTwoCard = (game: Game) => {
  game.drawCount += 2;
};
