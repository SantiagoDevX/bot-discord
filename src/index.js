import { Client, GatewayIntentBits, Collection } from "discord.js";
import { config } from "./config.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (!config.bot.token) {
  console.error(new Error("Token no proporcionado"));
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers, // * en dado caso quiera registrarlos automáticamente -> refactorizar cosas
  ],
});

//* ::CONSTANTES DE DIRECCIONES::
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Cargar comandos
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands", "clients");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandsFiles) {
  const command = await import(`${commandsPath}/${file}`);
  client.commands.set(command.default.name, command.default);
}

//Cargar eventos
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const { default: event } = await import(`${eventsPath}/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(config.bot.token);
