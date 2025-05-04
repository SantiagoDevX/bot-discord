export const config = {
  bot: {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX || "!",
    table_users: process.env.TABLE_USERS || "users",
    xpStep: process.env.XPSTEP || 4,
  },
  groq: {
    apiKey: process.env.GROQ_API_KEY,
  },
  mysql: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "santiagodevx",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "db_bot",
  },
};
