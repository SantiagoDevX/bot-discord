import { Events } from "discord.js";
const event = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        if (!client.user) {
            console.log("Bot logged in but user is null");
            return;
        }
        console.log(`Bot Logged as ${client.user.tag}`);
    },
};
export default event;
