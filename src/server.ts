import { configDotenv } from "dotenv";
import type { ClientToServerEvents, ServerToClientEvents } from "@/types";
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
  handleRoomExistence,
  handleDisconnect,
} from "@/socket";

configDotenv();
const PORT = Number(process.env.PORT);
const ORIGIN = process.env.CLIENT_URL;

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(PORT, {
  cors: {
    origin: ORIGIN,
  },
});

console.log(`Server Started for ${ORIGIN} with Port: ${PORT}`);

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

  handleDisconnect(socket);
});
