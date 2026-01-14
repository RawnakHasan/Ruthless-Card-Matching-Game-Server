import { Games } from "../../../games";
import { io } from "../../../";
import type { CustomSocket, Game } from "../../../types";

export const getGame = (roomId: string, socket: CustomSocket): Game => {
  const game = Games.get(roomId);

  if (!game) {
    io.to(socket.id).emit("roomNotFoundError", {
      message: `Game with Room Id ${roomId} couldn't be found`,
    });
    io.to(socket.id).emit("roomExistence", false);
  }

  return game!;
};
