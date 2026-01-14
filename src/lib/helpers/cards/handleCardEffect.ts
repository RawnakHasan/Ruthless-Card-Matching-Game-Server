import type { Card, Game } from "../../../types";
import {
  handleDrawTwoCard,
  handleDrawFourCard,
  handleDrawSixCard,
  handleDrawTenCard,
  handleZerosPass,
  handleReverseCard,
  handleSkipCard,
  handleSkipAllCard,
  handleDiscardAllCard,
  handleReverseDrawFourCard,
  handleColorRouletteCard,
} from "./CardEffects";

export const handleCardEffect = (game: Game, card: Card) => {
  switch (card.type) {
    case "Normal":
      switch (card.name) {
        case 0:
          handleZerosPass(game);
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          // Here I did intended to add the handleSevensSwap(game) effect but after some code writing and stuffs so
          // I figured it would be really hard for me to impliment something so I made another socket to handle that
          // there is another handler for this card only so when it will be played it will be played as a normal card
          // And the main thing of swaping the hands will be done by the socket handler or even the handleSevensSwap
          // function
          break;
        case 8:
          break;
        case 9:
          break;
      }
      break;
    case "Action":
      switch (card.name) {
        case "Reverse":
          handleReverseCard(game);
          break;
        case "Skip":
          handleSkipCard(game);
          break;
        case "Draw 2":
          handleDrawTwoCard(game);
          break;
        case "Draw 4":
          handleDrawFourCard(game);
          break;
        case "Skip All":
          handleSkipAllCard(game);
          break;
        case "Discard All":
          handleDiscardAllCard(game, card.color);
          break;
      }
      break;
    case "Wild":
      switch (card.name) {
        case "Reverse Draw 4":
          handleReverseDrawFourCard(game);
          break;
        case "Draw 6":
          handleDrawSixCard(game);
          break;
        case "Draw 10":
          handleDrawTenCard(game);
          break;
        case "Color Roulette":
          handleColorRouletteCard(game, card);
          break;
      }
      break;
  }
};
