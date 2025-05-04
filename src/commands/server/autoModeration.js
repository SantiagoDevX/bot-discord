import { forbiddenWords } from "./badWords.js";
import { Collection } from "discord.js";

const warnings = new Collection(); // userId -> warningCount
const recentMessages = new Collection(); // userId -> [timestamps]

const cleanText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "");
};

const moderateContent = (message) => {
  const cleanedContent = cleanText(message.content);
  return forbiddenWords.some((word) => cleanedContent.includes(word));
};

const handleWarning = async (message) => {
  const userId = message.author.id;
  const guildMember = message.member;
  const userWarnings = warnings.get(userId) || 0;
  const newWarnings = userWarnings + 1;

  warnings.set(userId, newWarnings);

  const channel = message.channel; // guarda el canal antes por si borras el mensaje

  if (newWarnings >= 5) {
    try {
      await guildMember.ban({
        reason: "Exceso de advertencias por moderación automática",
      });
      console.log(`🚫 Usuario baneado: ${message.author.tag}`);
    } catch (error) {
      console.error("❌ Error al banear:", error);
    }
  } else if (newWarnings >= 3) {
    try {
      // Para evitar errores, usamos edit con 'communicationDisabledUntil'
      const timeoutDuration = 10 * 60 * 1000; // 10 minutos
      const timeoutUntil = new Date(Date.now() + timeoutDuration).toISOString();

      await guildMember.edit({
        communicationDisabledUntil: timeoutUntil,
      });

      console.log(`⏳ Usuario en timeout: ${message.author.tag}`);
    } catch (error) {
      console.error("❌ Error al aplicar timeout:", error);
    }
  } else {
    try {
      await channel.send({
        content: `⚠️ Advertencia ${newWarnings}/5 para <@${userId}>: No uses lenguaje ofensivo.`,
      });
    } catch (error) {
      console.error("❌ Error al enviar advertencia:", error);
    }
  }
};

const handleSpam = async (message) => {
  const userId = message.author.id;
  const now = Date.now();

  if (!recentMessages.has(userId)) {
    recentMessages.set(userId, []);
  }

  const timestamps = recentMessages.get(userId);
  timestamps.push(now);

  const recent = timestamps.filter((timestamp) => now - timestamp < 10000);
  recentMessages.set(userId, recent);

  if (recent.length > 5) {
    try {
      await message.delete();
      console.log(`💥 Anti-spam activado para ${message.author.tag}`);
    } catch (err) {
      console.error("❌ Error al eliminar mensaje spam:", err);
    }

    await handleWarning(message);
  }
};

export default {
  name: "autoModeration",
  async execute(message, client) {
    if (message.author.bot) return;

    const isForbidden = moderateContent(message);
    if (isForbidden) {
      try {
        await message.delete();
        console.log(
          `🛑 Mensaje eliminado por contenido prohibido: "${message.content}"`
        );
      } catch (error) {
        console.error("❌ Error al eliminar mensaje:", error);
      }

      await handleWarning(message);
      return;
    }

    await handleSpam(message);

    const Manager = await import("./xpManager.js");
    Manager.default.execute(message, client);
  },
};
