import type { Server, Socket } from "socket.io";
import type { ClientToServerEvents } from "@/types/socket/ClientToServerEvents";
import type { ServerToClientEvents } from "@/types/socket/ServerToClientEvents";

export type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type CustomIo = Server<ClientToServerEvents, ServerToClientEvents>;
export { ClientToServerEvents, ServerToClientEvents };
