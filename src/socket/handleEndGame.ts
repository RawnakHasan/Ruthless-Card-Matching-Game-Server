import { Games } from "@/games";
import { io } from "@/server";
import { CustomSocket } from "@/types";

export const handleEndGame = (socket: CustomSocket) => {
  socket.on("endGame", ({ roomId }) => {
    Games.delete(roomId);
    io.to(roomId).emit("gameEnded", "Game Finsihed");
  });
};
