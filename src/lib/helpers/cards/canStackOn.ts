import type { Card } from "../../../types";
import { isDrawCard, type DrawCardName } from "./isDrawCard";

export const canStackOn = (top: Card, played: Card): boolean => {
  if (!isDrawCard(top) || !isDrawCard(played)) {
    return false;
  }

  const stackRules: Record<DrawCardName, readonly DrawCardName[]> = {
    "Draw 2": ["Draw 2", "Draw 4", "Draw 6", "Draw 10", "Reverse Draw 4"],
    "Draw 4": ["Draw 4", "Draw 6", "Draw 10", "Reverse Draw 4"],
    "Reverse Draw 4": ["Reverse Draw 4", "Draw 6", "Draw 10"],
    "Draw 6": ["Draw 6", "Draw 10"],
    "Draw 10": ["Draw 10"],
  };

  // ✅ Now TS knows top.name is DrawCardName
  return stackRules[top.name].includes(played.name);
};
