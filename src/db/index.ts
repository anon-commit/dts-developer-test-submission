import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "tasks",
  password: "",
  port: 5432,
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
        due_date TIMESTAMP NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

export { pool, connectDB };
