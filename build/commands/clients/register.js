import { getUserData, createUser } from "../../db/mysql.js";
const command = {
    name: "register",
    description: "Te registra en la BD",
    async execute(message, args, client) {
        const { id: userId, username } = message.author;
        try {
            const [UserData] = await getUserData(userId);
            if (!UserData) {
                await createUser(userId, username);
                await message.reply(`${username} te has registrado correctamente`);
            }
            else {
                await message.reply(`${username} ya te encuentras registrado`);
            }
        }
        catch (err) {
            console.error(err);
            await message.reply("❌ Hubo un error al registrarte.");
        }
    },
};
export default command;
