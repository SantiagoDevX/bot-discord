import { Message, Client } from "discord.js";

export interface Command {
  name: string;
  description: string;
  execute: (
    message: Message,
    args: string[],
    client?: Client
  ) => Promise<void> | void;
}

export interface Event {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void> | void;
}

export interface UserProfile {
  id: string;
  username: string;
  level: number;
  xp: number;
  messages: number;
  created_at: Date;
}
