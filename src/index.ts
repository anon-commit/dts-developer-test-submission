import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { connectDB } from "./db";
import tasks from "./routes/tasks";

await connectDB();

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.json({ message: "Welcome to the Task Management API." });
});

app.route("/tasks", tasks);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  },
);
