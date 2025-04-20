import { pool } from "../db";
import {
  getAllTasks,
  findById,
  updateStatus,
  deleteTask,
  insertTask,
} from "../queries/taskQueries.queries.js";
import type {
  IFindByIdResult,
  IGetAllTasksResult,
  IUpdateStatusResult,
  status,
} from "../queries/taskQueries.queries.js";

class Task {
  title: string;
  status: status;
  due_date: Date;
  created_at: Date;
  id?: number;
  description?: string;

  constructor(
    title: string,
    status: status = "TODO",
    due_date: Date,
    description?: string,
    id?: number,
  ) {
    this.title = title;
    this.status = status;
    this.due_date = due_date;
    this.description = description;
    this.id = id;
  }

  /**
   * Retrieves all tasks from the database, ordered by creation date in descending order.
   *
   * @returns {Promise<IGetAllTasksResult[]>} - A promise that resolves to an array of all tasks (will be empty if there are no tasks).
   * @throws {Error} - Throws if the query fails.
   */
  static async getAll(): Promise<IGetAllTasksResult[]> {
    const allTasks = await getAllTasks.run(undefined, pool);
    return allTasks;
  }

  /**
   * Retrieves the task with id `id` from the database.
   * If a task with id `id` does not exist, null is returned.
   *
   * @param {number} id - id of the task to retrieve.
   * @returns {Promise<IFindByIdResult | null>} - A promise that resolves to the task, or null if the task does not exist.
   * @throws {Error} - Throws if the query fails.
   */
  static async findById(id: number): Promise<IFindByIdResult | null> {
    const task = await findById.run({ taskId: id }, pool);

    if (task.length === 0) {
      return null;
    }

    return task[0];
  }

  /**
   * Updates the status of task with id `id` in the database.
   *
   * @param {number} id - id of the task to update.
   * @returns {Promise<IUpdateStatusResult | null>} - A promise that resolves to the updated status, or null if the task does not exist.
   * @throws {Error} - Throws if the query fails.
   */
  static async updateStatus(
    id: number,
    newStatus: status,
  ): Promise<IUpdateStatusResult | null> {
    const result = await updateStatus.run(
      { taskId: id, newStatus: newStatus },
      pool,
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  }

  /**
   * Deletes task with id `id` from the database.
   *
   * @param {number} id - id of the task to delete.
   * @returns {Promise<number>} - A promise that resolves to 1 to indicate success or 0 if the task does not exist.
   * @throws {Error} - Throws if the query fails.
   */
  static async delete(id: number): Promise<number> {
    const result = await deleteTask.run({ taskId: id }, pool);

    if (result.length === 0) {
      return 0;
    }

    return 1;
  }

  /**
   * Inserts the task into the database.
   *
   * @returns {Promise<Task>} - A promise that resolves to the newly inserted task.
   * @throws {Error} - Throws if the query fails.
   */
  async save(): Promise<Task> {
    const rawResult = await insertTask.run(
      {
        title: this.title,
        description: this.description,
        status: this.status,
        due_date: this.due_date,
      },
      pool,
    );

    const result = rawResult[0];

    return new Task(
      result.title,
      result.status,
      result.due_date,
      result.description ? result.description : undefined,
      result.id,
    );
  }
}

export default Task;
