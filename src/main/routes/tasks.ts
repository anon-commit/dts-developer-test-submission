import type { Context } from "hono";
import { z } from "zod";
import Task from "../models/task.js";
import { Hono } from "hono";

/*
 * Zod schemas
 */
const StatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

const TaskIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Task ID must be a number").transform(Number),
});

const CreateTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  status: StatusEnum.default("TODO"),
  due_date: z
    .string()
    .datetime({
      message:
        "Invalid due_date format. Dates must be supplied in ISO 8601 format with the UTC time zone designator.",
    })
    .transform((str) => new Date(str)),
});

const UpdateStatusSchema = z.object({
  status: StatusEnum,
});

const tasks = new Hono();

/**
 * GET /tasks
 * Retrieves all tasks.
 */
tasks.get("/", async (c: Context) => {
  try {
    const tasks = await Task.getAll();

    if (tasks.length === 0) {
      return c.json({ message: "No tasks found" }, 404);
    }

    return c.json(tasks, 200);
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return c.json({ message: "Failed to retrieve tasks" }, 500);
  }
});

/**
 * GET /tasks/:id
 * Retrieves a single task by its ID.
 */
tasks.get("/:id", async (c: Context) => {
  try {
    const idValidation = TaskIdParamSchema.safeParse({
      id: c.req.param("id"),
    });
    if (!idValidation.success) {
      return c.json({ message: "ID must only contain integers" }, 400);
    }
    const { id } = idValidation.data;

    const task = await Task.findById(id);
    if (!task) {
      return c.json({ message: "Task not found" }, 404);
    }

    return c.json(task, 200);
  } catch (error) {
    console.error("Error retrieving task: ", error);
    return c.json(
      { message: "Failed to retrieve task (server side error)" },
      500,
    );
  }
});

/**
 * POST /tasks
 * Creates a new task.
 */
tasks.post("/", async (c: Context) => {
  try {
    const body = await c.req.json();
    const bodyValidation = CreateTaskSchema.safeParse(body);

    if (!bodyValidation.success) {
      return c.json(
        {
          message: "Incorrect task format",
          errors: bodyValidation.error.issues,
        },
        400,
      );
    }

    const { title, status, due_date, description } = bodyValidation.data;

    if (due_date < new Date()) {
      return c.json({ message: "due_date must be in the future" }, 400);
    }

    const newTask = new Task(title, status, due_date, description);
    await newTask.save();

    return c.body(null, 201);
  } catch (error) {
    console.error("Error creating task: ", error);
    return c.json({ message: "Failed to create task" }, 500);
  }
});

/**
 * PATCH /tasks/status/:id
 * Updates the status of an existing task.
 */
tasks.patch("/status/:id", async (c: Context) => {
  try {
    const idValidation = TaskIdParamSchema.safeParse({ id: c.req.param("id") });
    if (!idValidation.success) {
      return c.json({ message: "ID must only contain integers" }, 400);
    }

    const body = await c.req.json();
    const bodyValidation = UpdateStatusSchema.safeParse(body);
    if (!bodyValidation.success) {
      return c.json(
        {
          message:
            "status must be one of the following: 'TODO', 'IN_PROGRESS', 'DONE'",
        },
        400,
      );
    }

    const { id } = idValidation.data;
    const { status } = bodyValidation.data;

    const result = await Task.updateStatus(id, status);
    if (!result) {
      return c.json({ message: "Task not found" }, 404);
    }

    return c.body(null, 204);
  } catch (error) {
    console.error("Error updating task: ", error);
    return c.json(
      { message: "Failed to update task status (server side error)" },
      500,
    );
  }
});

/**
 * DELETE /tasks/:id
 * Deletes a task by its ID.
 */
tasks.delete("/:id", async (c: Context) => {
  try {
    const idValidation = TaskIdParamSchema.safeParse({
      id: c.req.param("id"),
    });
    if (!idValidation.success) {
      return c.json({ message: "ID must only contain integers" }, 400);
    }
    const { id } = idValidation.data;

    const result = await Task.delete(id);
    if (!result) {
      return c.json({ message: "Task not found" }, 404);
    }

    return c.body(null, 204);
  } catch (error) {
    console.error("Error deleting task: ", error);
    return c.json(
      { message: "Failed to delete task (server side error)" },
      500,
    );
  }
});

export default tasks;
