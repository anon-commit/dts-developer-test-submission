import type { Context } from "hono";
import Task from "../models/task.js";
import { Hono } from "hono";
import { successResponse } from "../util/responseWrappers.js";
import {
  TaskIdParamSchema,
  CreateTaskSchema,
  UpdateStatusSchema,
} from "./tasks.schemas.js";

const tasks = new Hono();

/*
 * All routes that take parameters must validate those parameters using Zod schemas.
 * If validation fails, an error must be thrown with a message sourced from the given Zod schema.
 *
 * Errors are handled at the top level in `index.ts` with the `app.onError` handler,
 * so try/catch blocks are not needed.
 */

/**
 * GET /tasks
 * Retrieves all tasks.
 */
tasks.get("/all", async (c: Context) => {
  const tasks = await Task.getAll();
  return c.json(successResponse(tasks), 200);
});

/**
 * GET /tasks/:id
 * Retrieves a single task by its ID.
 */
tasks.get("/:id", async (c: Context) => {
  const { id } = TaskIdParamSchema.parse({
    id: c.req.param("id"),
  });
  const task = await Task.findById({ taskId: id });
  return c.json(successResponse(task), 200);
});

/**
 * POST /tasks
 * Creates a new task.
 */
tasks.post("/", async (c: Context) => {
  const body = await c.req.json();
  const { title, status, due_date, description } = CreateTaskSchema.parse(body);

  const task = await Task.save({ title, status, due_date, description });

  return c.json(successResponse({ task: { ...task } }), 201);
});

/**
 * PATCH /tasks/status/:id
 * Updates the status of an existing task.
 */
tasks.patch("/status/:id", async (c: Context) => {
  const { id } = TaskIdParamSchema.parse({ id: c.req.param("id") });
  const body = await c.req.json();
  const { status } = UpdateStatusSchema.parse(body);

  const result = await Task.updateStatus({ taskId: id, newStatus: status });

  return c.json(successResponse({ new_status: result }), 200);
});

/**
 * DELETE /tasks/:id
 * Deletes a task by its ID.
 */
tasks.delete("/:id", async (c: Context) => {
  const { id } = TaskIdParamSchema.parse({
    id: c.req.param("id"),
  });

  await Task.delete({ taskId: id });

  return c.body(null, 204);
});

export default tasks;
