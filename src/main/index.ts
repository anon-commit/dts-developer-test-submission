import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { connectDB } from "./db";
import tasks from "./routes/tasks";
import type { Context } from "hono";
import { ZodError } from "zod";
import { errorResponse } from "./util/responseWrappers";
import { TaskNotFoundError } from "./util/errors.js";

await connectDB();

const app = new Hono();

app.use(logger());
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));

app.get("/", (c) => {
  return c.json({ message: "Welcome to the Task Management API." });
});

app.route("/tasks", tasks);

app.onError((err, c: Context) => {
  if (err instanceof ZodError) {
    const messages = err.errors.map((cur) => {
      return { param: cur.path.toString(), message: cur.message };
    });
    return c.json(
      errorResponse(
        "Invalid parameters. See errors property for details.",
        messages,
      ),
      400,
    );
  }
  if (err instanceof TaskNotFoundError) {
    return c.json(errorResponse(err.message), 404);
  }

  console.error(err);
  return c.json("Server side error", 500);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  },
);
