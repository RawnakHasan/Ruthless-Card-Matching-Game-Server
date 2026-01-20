import type { ClientGame, ClientPlayer, Game } from "@/types";
import { getPlayerWithPlayerId, resetGame } from "@helpers/game";
import { io } from "@/server";
import { calculateLeaderBoardPosition } from "@/lib/calculateLeaderBoardPosition";

export const sendGameDataToClient = (game: Game, roomId: string) => {
  const clientPlayers: ClientPlayer[] = game.players.map((player) => ({
    id: player.id,
    uuid: player.uuid,
    username: player.username,
    host: player.host,
    cardCount: player.hand.length,
    status: player.status.type,
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

  if (game.gamePhase === "finished") {
    const leaderboard = calculateLeaderBoardPosition(game);
    io.to(roomId).emit("leaderBoard", leaderboard);
    return;
  }

  io.to(roomId).emit("gameUpdate", clientGame);

  game.players.forEach((player) => {
    const mainPlayer = getPlayerWithPlayerId(game, player.uuid);
    io.to(player.uuid).emit("userDataUpdate", mainPlayer);
  });
};
