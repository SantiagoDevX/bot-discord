import { EmbedBuilder, Message, Client, APIEmbedField } from "discord.js";
import { Command } from "../../types/index.js";

const command: Command = {
  name: "help",
  description: "Muestra comandos disponibles",
  async execute(message: Message, args: string[], client?: Client) {
    if (!client) return;

    const fields: APIEmbedField[] = [];
    client.commands.forEach((comando) => {
      fields.push({
        name: `!${comando.name}`,
        value: `${comando.description}`,
        inline: false,
      });
    });

    const embed = new EmbedBuilder()
      .setTitle("📖 Lista de comandos")
      .setDescription("Aquí tienes todos los comandos disponibles:")
      .setFields(fields)
      .setColor("Blue");

    await message.reply({ embeds: [embed] });
  },
};

export default command;
