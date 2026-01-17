import { Games } from "@/games";
import { createPlayer } from "@helpers/game";
import { generateRoomId } from "@/lib/roomIdGenerator";
import { CustomSocket } from "@/types";

export const handleCreateGame = (socket: CustomSocket) => {
  socket.on("createGame", ({ username }) => {
    let roomId: string;

    // generates Room Id and do while Loop Ensures Miracously same room Id doesn't get Created
    do {
      roomId = generateRoomId();
    } while (Games.has(roomId));

    // Game Creator Gets set
    const isHost = true;
    // Creates a Host Player
    const player = createPlayer(0, username, socket.id, isHost);

    // The User is send to the the generated web Socket Room
    socket.join(roomId);

    // Initial Game State are Set
    Games.set(roomId, {
      players: [player],
      deck: [],
      discardPile: [],
      drawCount: 0,
      gamePhase: "waiting",
      hostSocketId: socket.id,
      playerTurn: player.id,
      rotation: 1,
      finishCount: 0,
      eliminationCount: 0,
    });

    // Room Id gets Sent to Client to redirect the User to the same room Id dynamic Page
    socket.emit("gameCreated", { roomId });
  });
};
