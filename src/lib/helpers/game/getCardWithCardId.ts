import { io } from "@/server";
import type { Card, Player } from "@/types";

export const getCardWithCardId = (player: Player, card: Card): Card => {
  const cardWithCardId = player.hand.find((c) => c.id === card.id);

  if (!cardWithCardId) {
    io.to(player.uuid).emit(
      "errors",
      `${card.name} Card wasn't found in ${player.username} hand`
    );
  }

  return cardWithCardId!;
};
