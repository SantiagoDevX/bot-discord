import { Events } from "discord.js";
import { config } from "../config.js";

const { prefix } = config.bot;

export default {
  name: Events.MessageCreate,
  once: false,
  async execute(message, client) {
    if (message.author.bot || message.content.trim().startsWith(prefix)) {
      // Separar el nombre del comando y argumentos
      const args = message.content.trim().slice(prefix.length).split(/ +/);
      const commandName = args.shift().toLowerCase();

      // Buscar el comando en la colección
      const command = client.commands.get(commandName);
      if (!command) return;

      try {
        // Ejecutar el comando
        await command.execute(message, client);
      } catch (error) {
        console.error(
          `❌ Error al ejecutar el comando "${commandName}":`,
          error
        );
        message.reply("⚠️ Ocurrió un error al ejecutar ese comando.");
      }
      return;
    }

    try {
      const moderator = await import("../commands/server/autoModeration.js");
      moderator.default.execute(message, client);
    } catch (err) {
      console.error(err);
    }
  },
};
