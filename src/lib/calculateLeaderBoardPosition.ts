import { Game } from "@/types";
import { LeaderboardEntry } from "@/types/game/LeaderBoard";

export const calculateLeaderBoardPosition = (
  game: Game
): LeaderboardEntry[] => {
  const finished = game.players
    .filter((p) => p.status.type === "Finished")
    .sort(
      (a, b) =>
        (a.status.type === "Finished" ? a.status.position : 0) -
        (b.status.type === "Finished" ? b.status.position : 0)
    );

  const eliminated = game.players
    .filter((p) => p.status.type === "Eliminated")
    .sort(
      (a, b) =>
        (a.status.type === "Eliminated" ? a.status.position : 0) -
        (b.status.type === "Eliminated" ? b.status.position : 0)
    );

  const playing = game.players
    .filter((p) => p.status.type === "Playing")
    .sort((a, b) => a.hand.length - b.hand.length);

  const leaderboard: LeaderboardEntry[] = [];
  let currentPosition = 1;

  // Finished players (no ties here)
  for (const player of finished) {
    leaderboard.push({
      playerId: player.id,
      username: player.username,
      position: currentPosition,
    });
    currentPosition++;
  }

  let lastCardCount: number | null = null;
  let lastPosition = currentPosition;

  // Playing players (ties allowed)
  for (const player of playing) {
    if (lastCardCount !== null && player.hand.length === lastCardCount) {
      // same position (tie)
      leaderboard.push({
        playerId: player.id,
        username: player.username,
        position: lastPosition,
      });
    } else {
      lastPosition = currentPosition;
      leaderboard.push({
        playerId: player.id,
        username: player.username,
        position: currentPosition,
      });
    }

    lastCardCount = player.hand.length;
    currentPosition++;
  }

  // Eliminated players (ordered elimination)
  for (const player of eliminated) {
    leaderboard.push({
      playerId: player.id,
      username: player.username,
      position: currentPosition,
    });
    currentPosition++;
  }

  return leaderboard;
};
