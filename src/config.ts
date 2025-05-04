interface BotConfig {
  token: string | undefined;
  prefix: string;
  table_users: string;
  xpStep: string | number;
}

interface GroqConfig {
  apiKey: string | undefined;
}

interface MysqlConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

interface TikTokConfig {
  access_token: string | undefined;
  open_id: string | undefined;
}

interface Config {
  bot: BotConfig;
  groq: GroqConfig;
  mysql: MysqlConfig;
  tiktok: TikTokConfig;
}

export const config: Config = {
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
  tiktok: {
    access_token: process.env.TIKTOK_ACCESS_TOKEN,
    open_id: process.env.TIKTOK_OPEN_ID,
  },
};
