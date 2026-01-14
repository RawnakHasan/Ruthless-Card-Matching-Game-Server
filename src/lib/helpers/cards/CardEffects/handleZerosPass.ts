import type { Game } from "@/types";

export const handleZerosPass = (game: Game) => {
  const players = game.players;
  const count = players.length;

  if (count < 2) return;

  // tell TS: every player has a hand
  const hands = players.map((p) => p.hand!);

  if (game.rotation === 1) {
    hands.unshift(hands.pop()!);
  } else {
    hands.push(hands.shift()!);
  }

  players.forEach((player, i) => {
    player.hand = hands[i]!;
  });
};

// Something I was Trying but couldn't do it
// export const handleZerosPass = (game: Game) => {
//   const players = game.players;
//   const count = players.length;

//   if (count < 2) return;

//   // Snapshot hands (important)
//   const handsSnapshot = players.map((p) => p.hand);

//   for (let i = 0; i < count; i++) {
//     const nextIndex = (i + game.rotation + count) % count;
//     const nextPlayer = players[nextIndex];

//     if (!nextPlayer) continue; // satisfies TS + runtime safety

//     nextPlayer.hand = handsSnapshot[i];
//   }
// };
