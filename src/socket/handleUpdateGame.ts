import { getGame, sendGameDataToClient } from "@helpers/game";
import { CustomSocket } from "@/types";

export const handleUpdateGame = (socket: CustomSocket) => {
  socket.on("updateGame", ({ roomId }) => {
    // The Game instance is searched and prepared for sending to client
    const game = getGame(roomId, socket);

    // Game data Gets send to every Player in the same room
    sendGameDataToClient(game, roomId);
  });
};
