import type { Game } from "@/types";

export const handleDrawSixCard = (game: Game) => {
  game.drawCount += 6;
};
