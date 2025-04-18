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
  status,
} from "../queries/taskQueries.queries.js";

class Task {
  title: string;
  description?: string;
  status: status;
  due_date: Date;
  created_at: Date;

  constructor(
    title: string,
    status: status = "TODO",
    due_date: Date,
    description?: string,
  ) {
    this.title = title;
    this.status = status;
    this.description = description;
    this.due_date = due_date;
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
   * @returns {Promise<number>} - A promise that resolves to 1 to indicate success or 0 if the task does not exist.
   * @throws {Error} - Throws if the query fails.
   */
  static async updateStatus(id: number, newStatus: status): Promise<number> {
    const result = await updateStatus.run(
      { taskId: id, newStatus: newStatus },
      pool,
    );

    if (result.length === 0) {
      return 0;
    }

    return 1;
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
   * @throws {Error} - Throws if the query fails.
   */
  async save() {
    insertTask.run(
      {
        title: this.title,
        description: this.description,
        status: this.status,
        due_date: this.due_date,
      },
      pool,
    );
  }
}

export default Task;
