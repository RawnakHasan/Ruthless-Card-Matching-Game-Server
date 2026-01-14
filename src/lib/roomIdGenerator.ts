import { customAlphabet } from "nanoid";

export const generateRoomId = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789",
  6
);
