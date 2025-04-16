import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { connectDB } from "./db";

const app = new Hono();

await connectDB();

app.get("/", (c) => {
  return c.json({ message: "Welcome to the Task Management API." });
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
