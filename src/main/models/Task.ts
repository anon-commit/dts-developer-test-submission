import { pool } from "../db";
import {
  getAllTasks,
  findById,
  updateStatus,
  deleteTask,
  insertTask,
  getTasksByCreatedDesc,
  getTasksByStatusDesc,
  getTasksByCreatedAsc,
  getTasksByStatusAsc,
} from "../queries/taskQueries.queries.js";
import type {
  IFindByIdResult,
  IGetAllTasksResult,
  IUpdateStatusResult,
  IInsertTaskResult,
  IGetTasksByCreatedDescParams,
  IGetTasksByStatusDescParams,
  IFindByIdParams,
  IUpdateStatusParams,
  IDeleteTaskParams,
  IInsertTaskParams,
} from "../queries/taskQueries.queries.js";
import type { SortOrder } from "../util/types.js";

class Task {
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
   * Retrieves the next page of size `pageSize` from the database,
   * ordered by creation date in ascending or descending order, based on `order`.
   *
   * @returns {Promise<IGetAllTasksResult>} - A promise that resolves to an array of tasks (will be empty if there are no tasks).
   * @throws {Error} - Throws if the query fails.
   */
  static async getTasksByCreated(
    sortOrder: SortOrder,
    pageParams: IGetTasksByCreatedDescParams,
  ): Promise<IGetAllTasksResult[]> {
    let page: IGetAllTasksResult[];

    if (sortOrder == "DESC") {
      page = await getTasksByCreatedDesc.run(pageParams, pool);
    } else {
      page = await getTasksByCreatedAsc.run(pageParams, pool);
    }

    return page;
  }

  /**
   * Retrieves the next page of size `pageSize` from the database,
   * ordered by status in ascending or descending order, based on `order`.
   *
   * @returns {Promise<IGetAllTasksResult>} - A promise that resolves to an array of tasks (will be empty if there are no tasks).
   * @throws {Error} - Throws if the query fails.
   */
  static async getTasksByStatus(
    sortOrder: SortOrder,
    pageParams: IGetTasksByStatusDescParams,
  ): Promise<IGetAllTasksResult[]> {
    let page: IGetAllTasksResult[];

    if (sortOrder == "DESC") {
      page = await getTasksByStatusDesc.run(pageParams, pool);
    } else {
      page = await getTasksByStatusAsc.run(pageParams, pool);
    }

    return page;
  }

  /**
   * Retrieves the task with id `id` from the database.
   * If a task with id `id` does not exist, null is returned.
   *
   * @param {IFindByIdParams} id - An object with one property: `taskId`, set to the value of the id of the task to retrieve.
   * @returns {Promise<IFindByIdResult | null>} - A promise that resolves to the task, or null if the task does not exist.
   * @throws {Error} - Throws if the query fails.
   */
  static async findById(id: IFindByIdParams): Promise<IFindByIdResult | null> {
    const task = await findById.run(id, pool);

    if (task.length === 0) {
      return null;
    }

    return task[0];
  }

  /**
   * Updates the status of task with id `id` in the database.
   * If a task with id `id` does not exist, null is returned.
   *
   * @param {IUpdateStatusParams} params - An object with two properties:
   *                                       `taskId`: the id of the task to update
   *                                       `newStatus`: the new status that will be assigned to the task
   * @returns {Promise<IUpdateStatusResult | null>} - A promise that resolves to the updated status, or null if the task does not exist.
   * @throws {Error} - Throws if the query fails.
   */
  static async updateStatus(
    params: IUpdateStatusParams,
  ): Promise<IUpdateStatusResult | null> {
    const result = await updateStatus.run(params, pool);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  }

  /**
   * Deletes task with id `id` from the database.
   *
   * @param {IDeleteTaskParams} id - An object with one property: `taskId`, set to the value of the id of the task to delete.
   * @returns {Promise<number>} - A promise that resolves to 1 to indicate success or 0 if the task does not exist.
   * @throws {Error} - Throws if the query fails.
   */
  static async delete(id: IDeleteTaskParams): Promise<number> {
    const result = await deleteTask.run(id, pool);

    if (result.length === 0) {
      return 0;
    }

    return 1;
  }

  /**
   * Inserts the task into the database.
   *
   * @param {IInsertTaskParams} params - An object with three properties:
   *                                       `title`: the title of the task
   *                                       `status`: the status of the task (one of 'TODO', 'IN_PROGRESS', 'DONE')
   *                                       `description`: an optional description for the task
   * @returns {Promise<IInsertTaskResult>} - A promise that resolves to the newly inserted task.
   * @throws {Error} - Throws if the query fails.
   */
  static async save(params: IInsertTaskParams): Promise<IInsertTaskResult> {
    const result = await insertTask.run(params, pool);

    return result[0];
  }
}

export default Task;
