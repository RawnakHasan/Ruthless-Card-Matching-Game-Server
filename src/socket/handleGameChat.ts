import { CustomIo, CustomSocket } from "../types";

export const handleGameChat = (socket: CustomSocket, io: CustomIo) => {
  socket.on("sendMessage", ({ roomId, message, username }) => {
    const trimmedMessage = message?.trim();
    if (!trimmedMessage || trimmedMessage.length > 500) return;

    const sender = username || "Unknown";

    const newMessage = {
      sender,
      message: trimmedMessage,
      timestamp: Date.now(),
    };

    // Broadcast to all clients in the room
    io.to(roomId).emit("recieveMessage", newMessage);
  });
};
