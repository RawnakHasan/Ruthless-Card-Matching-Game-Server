import { io } from "..";
import { createPlayer, getGame } from "../lib/helpers/game";
import { CustomSocket } from "../types";

export const hanldeJoinGame = (socket: CustomSocket) => {
  socket.on("joinGame", ({ username, roomId }) => {
    // Gets The Game with roomId provided from The Client
    const game = getGame(roomId, socket);

    // Doesn't need last argument of isHost as default is false
    const socketId = socket.id;
    const isHost = false;
    const player = createPlayer(
      game.players.length,
      username,
      socketId,
      isHost
    );

    // The User is send to the the generated web Socket Room
    socket.join(roomId);

    // new player is pushed to the players array of the game object
    game.players.push(player);

    // Room Id gets Sent to Client to redirect the User to the same room Id dynamic Page
    io.to(roomId).emit("gameJoined", { roomId });
  });
};
