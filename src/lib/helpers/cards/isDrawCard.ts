import type { Card } from "@/types";

export const DRAW_CARD_NAMES = [
  "Draw 2",
  "Draw 4",
  "Draw 6",
  "Draw 10",
  "Reverse Draw 4",
] as const;

export type DrawCardName = (typeof DRAW_CARD_NAMES)[number];

export const isDrawCard = (
  card: Card
): card is Card & { name: DrawCardName } => {
  return (
    typeof card.name === "string" &&
    (DRAW_CARD_NAMES as readonly string[]).includes(card.name)
  );
};
