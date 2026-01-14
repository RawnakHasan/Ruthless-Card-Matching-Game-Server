import type { Game, WildCard } from "../../../../types";
import { getNextPlayer, reshuffle } from "../../game";
import { drawCards } from "../../game/drawCards";

export const handleColorRouletteCard = (game: Game, card: WildCard) => {
  const chosenColor = card.chosenColor;
  if (!chosenColor) return;

  const targetPlayer = getNextPlayer(game);

  while (true) {
    if (game.deck.length === 0) reshuffle(game);

    const [drawnCard] = drawCards(game, 1);
    if (!drawnCard) break;

    targetPlayer.hand.push(drawnCard);

    if (drawnCard.type !== "Wild" && drawnCard.color === chosenColor) {
      break;
    }
  }

  game.drawCount = 0;

  game.playerTurn = targetPlayer.id;
};
