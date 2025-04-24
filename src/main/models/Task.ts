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
import { TaskNotFoundError } from "../util/errors.js";

/*
 * Any queries that should return tasks will throw a TaskNotFoundError when there
 * are no tasks to return.
 *
 * pgtyped's <query>.run() method can also throw if a query fails for some reason.
 *
 * Errors are handled at the top level in `index.ts` with the `app.onError` handler,
 * so try/catch blocks are not needed.
 */

class Task {
  /**
   * Retrieves all tasks from the database, ordered by creation date in descending order.
   *
   * @returns {Promise<IGetAllTasksResult[]>} - A promise that resolves to an array of all tasks.
   * @throws {TaskNotFoundError} - Throws if no tasks exist.
   */
  static async getAll(): Promise<IGetAllTasksResult[]> {
    const allTasks = await getAllTasks.run(undefined, pool);

    if (allTasks.length === 0) {
      throw new TaskNotFoundError();
    }

    return allTasks;
  }

  /**
   * Retrieves the next page of size `pageSize` from the database,
   * ordered by creation date in ascending or descending order, based on `sortOrder`.
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
   * ordered by status in ascending or descending order, based on `sortOrder`.
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
   *
   * @param {IFindByIdParams} id - An object with one property: `taskId`, set to the value of the id of the task to retrieve.
   * @returns {Promise<IFindByIdResult>} - A promise that resolves to the task.
   * @throws {TaskNotFoundError} - Throws if the task does not exist.
   */
  static async findById(id: IFindByIdParams): Promise<IFindByIdResult> {
    const task = await findById.run(id, pool);

    if (task.length === 0) {
      throw new TaskNotFoundError();
    }

    return task[0];
  }

  /**
   * Updates the status of task with id `id` in the database.
   *
   * @param {IUpdateStatusParams} params - An object with two properties:
   *                                       `taskId`: the id of the task to update
   *                                       `newStatus`: the new status that will be assigned to the task
   * @returns {Promise<IUpdateStatusResult>} - A promise that resolves to the updated status.
   * @throws {TaskNotFoundError} - Throws if the the task does not exist.
   */
  static async updateStatus(
    params: IUpdateStatusParams,
  ): Promise<IUpdateStatusResult> {
    const result = await updateStatus.run(params, pool);

    if (result.length === 0) {
      throw new TaskNotFoundError();
    }

    return result[0];
  }

  /**
   * Deletes task with id `id` from the database.
   *
   * @param {IDeleteTaskParams} id - An object with one property: `taskId`, set to the value of the id of the task to delete.
   * @returns {Promise<number>} - A promise that resolves to 1 to indicate success.
   * @throws {TaskNotFoundError} - Throws if the task does not exist.
   */
  static async delete(id: IDeleteTaskParams): Promise<number> {
    const result = await deleteTask.run(id, pool);

    if (result.length === 0) {
      throw new TaskNotFoundError();
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
   */
  static async save(params: IInsertTaskParams): Promise<IInsertTaskResult> {
    const result = await insertTask.run(params, pool);

    return result[0];
  }
}

export default Task;
