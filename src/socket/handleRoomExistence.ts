import { getGame } from "../lib/helpers/game";
import { CustomSocket } from "../types";

export const handleRoomExistence = (socket: CustomSocket) => {
  socket.on("checkRoomExistence", (roomId) => {
    getGame(roomId, socket);
  });
};
