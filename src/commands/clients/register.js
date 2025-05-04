import { getUserData, createUser } from "../../db/mysql.js";

export default {
  name: "register",
  once: false,
  description: "Te registra en la BD",
  async execute(message, client) {
    const { id: userId, username } = message.author;
    try {
      const UserData = await getUserData(userId);
      if (!UserData) {
        createUser(userId, username);
      } else {
        message.reply(`${username} ya te encuentras registrado`);
      }
    } catch (err) {
      console.error(err);
    }
  },
};
