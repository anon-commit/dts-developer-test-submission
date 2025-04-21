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

async function connectDB() {
  try {
    await pool.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
              CREATE TYPE status AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');
          END IF;
      END $$;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status status NOT NULL DEFAULT 'TODO',
        due_date TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

export { pool, connectDB };
