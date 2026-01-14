import type { ClientGame, ClientPlayer, Game } from "../../../types";
import { getPlayerWithPlayerId } from "./getPlayer";
import { io } from "../../../index";

export const sendGameDataToClient = (game: Game, roomId: string) => {
  const clientPlayers: ClientPlayer[] = game.players.map((player) => ({
    id: player.id,
    uuid: player.uuid,
    username: player.username,
    host: player.host,
    cardCount: player.hand.length,
  }));

  const clientGame: ClientGame = {
    rotation: game.rotation,
    discardPile: game.discardPile,
    drawCount: game.drawCount,
    gamePhase: game.gamePhase,
    playerTurn: game.playerTurn,
    hostSocketId: game.hostSocketId,
    players: clientPlayers,
  };

  io.to(roomId).emit("gameUpdate", clientGame);

  game.players.forEach((player) => {
    const mainPlayer = getPlayerWithPlayerId(game, player.uuid);
    io.to(player.uuid).emit("userDataUpdate", mainPlayer);
  });
};
