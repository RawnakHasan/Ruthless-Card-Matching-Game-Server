import type { Game } from "@/types";

export const handleReverseCard = (game: Game) => {
  game.rotation *= -1;
};
