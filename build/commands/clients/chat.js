import Groq from "groq-sdk";
import { TextChannel } from "discord.js";
import { config } from "../../config.js";
const { apiKey } = config.groq;
const groq = new Groq({ apiKey });
const sendToGroq = async (message) => {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `${message} (No te pases de 2000 caracteres)`,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });
        return (completion.choices[0]?.message?.content ||
            "Lo siento, no pude generar una respuesta.");
    }
    catch (error) {
        console.error("Error al obtener respuesta de Groq:", error);
        return "Hubo un error al procesar tu solicitud.";
    }
};
function dividirMensajeLargo(texto, maxLength = 2000) {
    const partes = [];
    let remainingText = texto;
    while (remainingText.length > 0) {
        if (remainingText.length <= maxLength) {
            partes.push(remainingText);
            break;
        }
        let corte = remainingText.lastIndexOf("\n", maxLength);
        if (corte === -1)
            corte = remainingText.lastIndexOf(" ", maxLength);
        if (corte === -1)
            corte = maxLength;
        partes.push(remainingText.slice(0, corte));
        remainingText = remainingText.slice(corte).trimStart();
    }
    return partes;
}
const command = {
    name: "chat",
    description: "permite interactuar con un modelo de IA",
    async execute(message, args) {
        let messageToSend = message.content.slice(this.name.length + 1).trim();
        if (!messageToSend) {
            await message.reply("Por favor, escribe algo para que pueda ayudarte.");
            return;
        }
        const response = await sendToGroq(messageToSend);
        if (response.trim()) {
            if (response.length >= 2000) {
                const partes = dividirMensajeLargo(response);
                for (const parte of partes) {
                    if (message.channel instanceof TextChannel) {
                        await message.channel.send(parte);
                    }
                }
            }
            else {
                await message.reply(response);
            }
        }
        else {
            await message.reply("Lo siento, no obtuve una respuesta válida.");
        }
    },
};
export default command;
