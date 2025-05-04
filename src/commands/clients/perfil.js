import { EmbedBuilder } from "discord.js";
import { getUserData, createUser } from "../../db/mysql.js";

const sendEmbed = (userData, message) => {
  const perfilEmbed = new EmbedBuilder()
    .setTitle(`🎖️ Perfil de ${userData.username}`)
    .setColor(0x00aeff)
    .addFields(
      {
        name: "XP",
        value: `${userData.xp}`,
        inline: true,
      },
      {
        name: "Rango",
        value: `${userData.rango}`,
        inline: true,
      }
    )
    .setThumbnail(message.author.displayAvatarURL());
  message.reply({ embeds: [perfilEmbed] });
};

export default {
  name: "perfil",
  description: "Muestra tu XP y rango",
  async execute(message, client) {
    try {
      const { id: userId, username } = message.author;
      const [userData] = await getUserData(userId);
      if (userData) {
        sendEmbed(userData, message);
      } else {
        await createUser(userId, username);
        const [createdUser] = await getUserData(userId);
        sendEmbed(createdUser, message);
      }
    } catch (err) {
      console.error(err);
      message.reply("❌ Hubo un error al obtener tu perfil.");
    }
  },
};
