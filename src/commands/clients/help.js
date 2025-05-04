import { EmbedBuilder } from "discord.js";

export default {
  name: "help",
  once: false,
  description: "Muestra comandos disponibles",
  execute(msg, client) {
    const fields = [];
    // console.log(client.commands);
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

    msg.reply({ embeds: [embed] });
  },
};
