import { EmbedBuilder, Message, Client } from "discord.js";
import { getUserData, createUser } from "../../db/mysql.js";
import { Command } from "../../types/index.js";
import { UserProfile } from "../../types/index.js";

const sendEmbed = (userData: UserProfile, message: Message) => {
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
        value: `${userData.level}`,
        inline: true,
      }
    )
    .setThumbnail(message.author.displayAvatarURL());
  message.reply({ embeds: [perfilEmbed] });
};

const command: Command = {
  name: "perfil",
  description: "Muestra tu XP y rango",
  async execute(message: Message, args: string[], client?: Client) {
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
      await message.reply("❌ Hubo un error al obtener tu perfil.");
    }
  },
};

export default command;
