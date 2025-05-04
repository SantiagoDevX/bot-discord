import { EmbedBuilder } from "discord.js";
import {
  getUserData,
  addXpUser,
  createUser,
  updateRangeUser,
} from "../../db/mysql.js";
import { config } from "../../config.js";

const { xpStep } = config.bot;

const ranges = {
  0: "Novato",
  120: "Junior",
  350: "Senior",
  650: "Mentor",
};

const calculateRange = (xp) => {
  const sortedRanges = Object.entries(ranges).sort((a, b) => b[0] - a[0]);

  for (const [minXp, rangeName] of sortedRanges) {
    if (xp >= minXp) {
      return rangeName;
    }
  }
  return "Novato";
};

const manageXp = async (message) => {
  try {
    const { id: idUser, username } = message.author;

    let [user] = await getUserData(idUser);

    if (!user) {
      await createUser(idUser, username);
      [user] = await getUserData(idUser);
    }

    const previousRange = user.rango;

    await addXpUser(idUser, xpStep);

    const [updatedUser] = await getUserData(idUser);
    const newXP = updatedUser.xp;
    const newRange = calculateRange(newXP);

    if (newRange !== previousRange) {
      await updateRangeUser(idUser, newRange);
      await sendEmbedRangeNew(message, newRange, newXP);
    }
  } catch (err) {
    console.error("Error al verificar XP del usuario:", err);
  }
};

const sendEmbedRangeNew = async (message, newRange, newXP) => {
  const embed = new EmbedBuilder()
    .setTitle("🎉 ¡Subiste de Rango!")
    .setDescription(
      `Felicidades ${message.author.username}, ahora eres **${newRange}** 🔥`
    )
    .setColor(0x00ff99)
    .setFooter({ text: `XP actual: ${newXP}` });

  await message.channel.send({ embeds: [embed] });
};

export default {
  name: "usersManager",
  description: "Administra todo lo referente a los usuarios",
  once: false,
  async execute(message, client) {
    await manageXp(message);
  },
};
