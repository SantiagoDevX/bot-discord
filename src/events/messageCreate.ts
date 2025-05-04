import { Events, Message, Client } from "discord.js";
import { config } from "../config.js";
import { Event } from "../types/index.js";

const { prefix } = config.bot;

const event: Event = {
  name: Events.MessageCreate,
  once: false,
  async execute(message: Message, client: Client) {
    if (message.author.bot || message.content.trim().startsWith(prefix)) {
      // Separar el nombre del comando y argumentos
      const args = message.content.trim().slice(prefix.length).split(/ +/);
      const commandName = args.shift()?.toLowerCase();

      if (!commandName) return;

      // Buscar el comando en la colección
      const command = client.commands.get(commandName);
      if (!command) return;

      try {
        // Ejecutar el comando
        await command.execute(message, args, client);
      } catch (error) {
        console.error(
          `❌ Error al ejecutar el comando "${commandName}":`,
          error
        );
        await message.reply("⚠️ Ocurrió un error al ejecutar ese comando.");
      }
      return;
    }

    try {
      const moderator = await import("../commands/server/autoModeration.js");
      await moderator.default.execute(message, [], client);
    } catch (err) {
      console.error(err);
    }
  },
};

export default event;
