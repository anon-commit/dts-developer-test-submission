/** Types generated for queries found in "src/main/queries/taskQueries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type status = 'DONE' | 'IN_PROGRESS' | 'TODO';

export type DateOrString = Date | string;

/** 'GetAllTasks' parameters type */
export type IGetAllTasksParams = void;

/** 'GetAllTasks' return type */
export interface IGetAllTasksResult {
  created_at: string | null;
  description: string | null;
  due_date: string | null;
  id: number;
  status: status;
  title: string;
}

/** 'GetAllTasks' query type */
export interface IGetAllTasksQuery {
  params: IGetAllTasksParams;
  result: IGetAllTasksResult;
}

const getAllTasksIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n  id,\n  title,\n  description,\n  status,\n  to_char(due_date, 'YYYY-MM-DD\"T\"HH24:MIZ') AS due_date,\n  to_char(created_at, 'YYYY-MM-DD\"T\"HH24:MIZ') AS created_at\nFROM tasks\nORDER BY id DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *   id,
 *   title,
 *   description,
 *   status,
 *   to_char(due_date, 'YYYY-MM-DD"T"HH24:MIZ') AS due_date,
 *   to_char(created_at, 'YYYY-MM-DD"T"HH24:MIZ') AS created_at
 * FROM tasks
 * ORDER BY id DESC
 * ```
 */
export const getAllTasks = new PreparedQuery<IGetAllTasksParams,IGetAllTasksResult>(getAllTasksIR);


/** 'FindById' parameters type */
export interface IFindByIdParams {
  taskId: number;
}

/** 'FindById' return type */
export interface IFindByIdResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {"usedParamSet":{"taskId":true},"params":[{"name":"taskId","required":true,"transform":{"type":"scalar"},"locs":[{"a":31,"b":38}]}],"statement":"SELECT * FROM tasks WHERE id = :taskId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM tasks WHERE id = :taskId!
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams,IFindByIdResult>(findByIdIR);


/** 'UpdateStatus' parameters type */
export interface IUpdateStatusParams {
  newStatus: status;
  taskId: number;
}

/** 'UpdateStatus' return type */
export interface IUpdateStatusResult {
  status: status;
}

/** 'UpdateStatus' query type */
export interface IUpdateStatusQuery {
  params: IUpdateStatusParams;
  result: IUpdateStatusResult;
}

const updateStatusIR: any = {"usedParamSet":{"newStatus":true,"taskId":true},"params":[{"name":"newStatus","required":true,"transform":{"type":"scalar"},"locs":[{"a":26,"b":36}]},{"name":"taskId","required":true,"transform":{"type":"scalar"},"locs":[{"a":49,"b":56}]}],"statement":"UPDATE tasks SET status = :newStatus! WHERE id = :taskId!\nRETURNING status"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE tasks SET status = :newStatus! WHERE id = :taskId!
 * RETURNING status
 * ```
 */
export const updateStatus = new PreparedQuery<IUpdateStatusParams,IUpdateStatusResult>(updateStatusIR);


/** 'DeleteTask' parameters type */
export interface IDeleteTaskParams {
  taskId: number;
}

/** 'DeleteTask' return type */
export interface IDeleteTaskResult {
  id: number;
}

/** 'DeleteTask' query type */
export interface IDeleteTaskQuery {
  params: IDeleteTaskParams;
  result: IDeleteTaskResult;
}

const deleteTaskIR: any = {"usedParamSet":{"taskId":true},"params":[{"name":"taskId","required":true,"transform":{"type":"scalar"},"locs":[{"a":29,"b":36}]}],"statement":"DELETE FROM tasks WHERE id = :taskId!\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM tasks WHERE id = :taskId!
 * RETURNING id
 * ```
 */
export const deleteTask = new PreparedQuery<IDeleteTaskParams,IDeleteTaskResult>(deleteTaskIR);


/** 'InsertTask' parameters type */
export interface IInsertTaskParams {
  description?: string | null | void;
  due_date: DateOrString;
  status: status;
  title: string;
}

/** 'InsertTask' return type */
export interface IInsertTaskResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'InsertTask' query type */
export interface IInsertTaskQuery {
  params: IInsertTaskParams;
  result: IInsertTaskResult;
}

const insertTaskIR: any = {"usedParamSet":{"title":true,"description":true,"status":true,"due_date":true},"params":[{"name":"title","required":true,"transform":{"type":"scalar"},"locs":[{"a":65,"b":71}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":74,"b":85}]},{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":88,"b":95}]},{"name":"due_date","required":true,"transform":{"type":"scalar"},"locs":[{"a":98,"b":107}]}],"statement":"INSERT INTO tasks (title, description, status, due_date)\nVALUES (:title!, :description, :status!, :due_date!)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO tasks (title, description, status, due_date)
 * VALUES (:title!, :description, :status!, :due_date!)
 * RETURNING *
 * ```
 */
export const insertTask = new PreparedQuery<IInsertTaskParams,IInsertTaskResult>(insertTaskIR);


