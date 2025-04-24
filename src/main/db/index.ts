import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: [".env.local", ".env"] });

const pool = new pg.Pool({
  database: "task_manager",
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT!),
});

export { pool };
