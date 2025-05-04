import { Events, Client } from "discord.js";
import { Event } from "../types/index.js";

const event: Event = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    if (!client.user) {
      console.log("Bot logged in but user is null");
      return;
    }
    console.log(`Bot Logged as ${client.user.tag}`);
  },
};

export default event;
