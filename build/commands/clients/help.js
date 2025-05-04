import { EmbedBuilder } from "discord.js";
const command = {
    name: "help",
    description: "Muestra comandos disponibles",
    async execute(message, args, client) {
        if (!client)
            return;
        const fields = [];
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
