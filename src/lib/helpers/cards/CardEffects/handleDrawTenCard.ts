import type { Game } from "../../../../types";

export const handleDrawTenCard = (game: Game) => {
  game.drawCount += 10;
};
