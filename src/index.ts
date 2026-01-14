import { configDotenv } from "dotenv";
import type { ClientToServerEvents, ServerToClientEvents } from "./types";
import { Server } from "socket.io";
import {
  handleCreateGame,
  handleEndGame,
  handleGameChat,
  handleGetCard,
  handlePlayCard,
  handleSevensSwapSocket,
  handleStartGame,
  handleUpdateGame,
  hanldeJoinGame,
} from "./socket";
import { handleRoomExistence } from "./socket/handleRoomExistence";

configDotenv();
const PORT = Number(process.env.PORT);
const ORIGIN = "https://ruthless-card-matching-game.vercel.app"

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(PORT, {
  cors: {
    origin: ORIGIN,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected with ${socket.id}`);

  handleRoomExistence(socket);
  handleCreateGame(socket);
  hanldeJoinGame(socket);
  handleUpdateGame(socket);
  handleStartGame(socket);
  handleGetCard(socket);
  handlePlayCard(socket);
  handleSevensSwapSocket(socket);
  handleEndGame(socket);

  handleGameChat(socket, io);

  socket.on("disconnect", () => {
    console.log(`User with socket id ${socket.id} got disconnected`);
  });
});
