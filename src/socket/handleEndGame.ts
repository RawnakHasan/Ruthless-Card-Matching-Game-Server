import { io } from "..";
import { Games } from "../games";
import { CustomSocket } from "../types";

export const handleEndGame = (socket: CustomSocket) => {
  socket.on("endGame", ({ roomId }) => {
    Games.delete(roomId);
    io.to(roomId).emit("gameEnded", "Game Finsihed");
  });
};
