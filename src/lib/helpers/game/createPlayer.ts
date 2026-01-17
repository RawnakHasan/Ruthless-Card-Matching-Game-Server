import type { Player } from "@/types";

export const createPlayer = (
  playersLength: number,
  username: string,
  socketId: string,
  isHost = false
): Player => {
  return {
    id: playersLength,
    uuid: socketId,
    username,
    hand: [],
    host: isHost,
    status: {
      type: "Playing",
    },
  };
};
