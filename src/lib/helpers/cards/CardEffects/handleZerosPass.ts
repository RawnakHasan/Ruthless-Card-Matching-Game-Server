import type { Game } from "@/types";

export const handleZerosPass = (game: Game) => {
  const activePlayers = game.players.filter((p) => p.status.type === "Playing");

  const count = activePlayers.length;
  if (count < 2) return;

  // copy hands of ACTIVE players only
  const hands = activePlayers.map((p) => [...p.hand]);

  let rotatedHands: typeof hands;

  if (game.rotation === 1) {
    // clockwise
    rotatedHands = [
      hands[hands.length - 1],
      ...hands.slice(0, hands.length - 1),
    ];
  } else {
    // counter-clockwise
    rotatedHands = [...hands.slice(1), hands[0]];
  }

  activePlayers.forEach((player, i) => {
    player.hand = rotatedHands[i];
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
