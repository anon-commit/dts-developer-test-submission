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
  getNumTasks,
  getTasksByDueDateDesc,
  getTasksByDueDateAsc,
} from "../queries/taskQueries.queries.js";
import type {
  IFindByIdResult as ITask,
  IUpdateStatusResult,
  IGetTasksByCreatedDescParams,
  IGetTasksByStatusDescParams,
  IFindByIdParams,
  IUpdateStatusParams,
  IDeleteTaskParams,
  IInsertTaskParams,
  IGetTasksByDueDateDescParams,
} from "../queries/taskQueries.queries.js";
import { TaskNotFoundError } from "../util/errors.js";

/*
 * Any queries that should return one or more tasks will throw a TaskNotFoundError
 * when there are no tasks to return.
 *
 * pgtyped's <query>.run() method can also throw if a query fails for any reason.
 *
 * Errors are handled at the top level in `index.ts` with the `app.onError` handler,
 * so try/catch blocks are not needed.
 */

class Task {
  /**
   * Returns all tasks from the database, ordered by creation date in descending order.
   */
  static async getAll(): Promise<ITask[]> {
    const allTasks = await getAllTasks.run(undefined, pool);

    if (allTasks.length === 0) {
      throw new TaskNotFoundError();
    }

    return allTasks;
  }

  /**
   * Returns the number of tasks in the database.
   */
  static async getNumTasks(): Promise<number> {
    const numTasks = await getNumTasks.run(undefined, pool);
    return parseInt(numTasks[0].count);
  }

  /**
   * Returns the next page of size `pageSize` from the database,
   * ordered by creation date in ascending or descending order, based on `sortOrder`.
   */
  static async getTasksByCreated(
    sortOrder: SortOrder,
    pageParams: IGetTasksByCreatedDescParams,
  ): Promise<ITask[]> {
    let page: ITask[];

    if (sortOrder == "DESC") {
      page = await getTasksByCreatedDesc.run(pageParams, pool);
    } else {
      page = await getTasksByCreatedAsc.run(pageParams, pool);
    }

    if (page.length === 0) {
      throw new TaskNotFoundError();
    }

    return page;
  }

  /**
   * Returns the next page of size `pageSize` from the database,
   * ordered by due date in ascending or descending order, based on `sortOrder`.
   */
  static async getTasksByDueDate(
    sortOrder: SortOrder,
    pageParams: IGetTasksByDueDateDescParams,
  ): Promise<ITask[]> {
    let page: ITask[];

    if (sortOrder == "DESC") {
      page = await getTasksByDueDateDesc.run(pageParams, pool);
    } else {
      page = await getTasksByDueDateAsc.run(pageParams, pool);
    }

    if (page.length === 0) {
      throw new TaskNotFoundError();
    }

    return page;
  }

  /**
   * Returns the next page of size `pageSize` from the database,
   * ordered by status in ascending or descending order, based on `sortOrder`.
   */
  static async getTasksByStatus(
    sortOrder: SortOrder,
    pageParams: IGetTasksByStatusDescParams,
  ): Promise<ITask[]> {
    let page: ITask[];

    if (sortOrder == "DESC") {
      page = await getTasksByStatusDesc.run(pageParams, pool);
    } else {
      page = await getTasksByStatusAsc.run(pageParams, pool);
    }

    if (page.length === 0) {
      throw new TaskNotFoundError();
    }

    return page;
  }

  /**
   * Returns the task with id `id` from the database.
   */
  static async findById(id: IFindByIdParams): Promise<ITask> {
    const task = await findById.run(id, pool);

    if (task.length === 0) {
      throw new TaskNotFoundError();
    }

    return task[0];
  }

  /**
   * Updates the status of task with id `id` in the database and returns the
   * updated status.
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
   * Deletes task with id `id` from the database. Returns 1 to indicate success.
   */
  static async delete(id: IDeleteTaskParams): Promise<number> {
    const result = await deleteTask.run(id, pool);

    if (result.length === 0) {
      throw new TaskNotFoundError();
    }

    return 1;
  }

  /**
   * Inserts the task into the database and returns the inserted task.
   */
  static async save(params: IInsertTaskParams): Promise<ITask> {
    const result = await insertTask.run(params, pool);

    return result[0];
  }
}

export default Task;
