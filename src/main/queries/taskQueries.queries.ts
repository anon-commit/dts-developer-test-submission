/** Types generated for queries found in "src/main/queries/taskQueries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type status = 'DONE' | 'IN_PROGRESS' | 'TODO';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

/** 'GetAllTasks' parameters type */
export type IGetAllTasksParams = void;

/** 'GetAllTasks' return type */
export interface IGetAllTasksResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetAllTasks' query type */
export interface IGetAllTasksQuery {
  params: IGetAllTasksParams;
  result: IGetAllTasksResult;
}

const getAllTasksIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM tasks ORDER BY created_at DESC, id DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM tasks ORDER BY created_at DESC, id DESC
 * ```
 */
export const getAllTasks = new PreparedQuery<IGetAllTasksParams,IGetAllTasksResult>(getAllTasksIR);


/** 'GetNumTasks' parameters type */
export type IGetNumTasksParams = void;

/** 'GetNumTasks' return type */
export interface IGetNumTasksResult {
  count: string;
}

/** 'GetNumTasks' query type */
export interface IGetNumTasksQuery {
  params: IGetNumTasksParams;
  result: IGetNumTasksResult;
}

const getNumTasksIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT COUNT(*) AS \"count!\" FROM tasks"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*) AS "count!" FROM tasks
 * ```
 */
export const getNumTasks = new PreparedQuery<IGetNumTasksParams,IGetNumTasksResult>(getNumTasksIR);


/** 'GetTasksByCreatedDesc' parameters type */
export interface IGetTasksByCreatedDescParams {
  pageSize: NumberOrString;
  prevCreatedAt?: DateOrString | null | void;
  prevId?: number | null | void;
}

/** 'GetTasksByCreatedDesc' return type */
export interface IGetTasksByCreatedDescResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByCreatedDesc' query type */
export interface IGetTasksByCreatedDescQuery {
  params: IGetTasksByCreatedDescParams;
  result: IGetTasksByCreatedDescResult;
}

const getTasksByCreatedDescIR: any = {"usedParamSet":{"prevCreatedAt":true,"prevId":true,"pageSize":true},"params":[{"name":"prevCreatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":32,"b":45},{"a":88,"b":101},{"a":120,"b":133}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":144,"b":150}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":195,"b":204}]}],"statement":"SELECT *\nFROM tasks\nWHERE (CAST(:prevCreatedAt AS timestamptz) IS NULL OR (created_at < :prevCreatedAt OR (created_at = :prevCreatedAt AND id < :prevId)))\nORDER BY created_at DESC, id DESC\nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE (CAST(:prevCreatedAt AS timestamptz) IS NULL OR (created_at < :prevCreatedAt OR (created_at = :prevCreatedAt AND id < :prevId)))
 * ORDER BY created_at DESC, id DESC
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByCreatedDesc = new PreparedQuery<IGetTasksByCreatedDescParams,IGetTasksByCreatedDescResult>(getTasksByCreatedDescIR);


/** 'GetTasksByCreatedAsc' parameters type */
export interface IGetTasksByCreatedAscParams {
  pageSize: NumberOrString;
  prevCreatedAt?: DateOrString | null | void;
  prevId?: number | null | void;
}

/** 'GetTasksByCreatedAsc' return type */
export interface IGetTasksByCreatedAscResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByCreatedAsc' query type */
export interface IGetTasksByCreatedAscQuery {
  params: IGetTasksByCreatedAscParams;
  result: IGetTasksByCreatedAscResult;
}

const getTasksByCreatedAscIR: any = {"usedParamSet":{"prevCreatedAt":true,"prevId":true,"pageSize":true},"params":[{"name":"prevCreatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":32,"b":45},{"a":88,"b":101},{"a":120,"b":133}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":144,"b":150}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":193,"b":202}]}],"statement":"SELECT *\nFROM tasks\nWHERE (CAST(:prevCreatedAt as timestamptz) IS NULL OR (created_at > :prevCreatedAt OR (created_at = :prevCreatedAt AND id > :prevId)))\nORDER BY created_at ASC, id ASC\nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE (CAST(:prevCreatedAt as timestamptz) IS NULL OR (created_at > :prevCreatedAt OR (created_at = :prevCreatedAt AND id > :prevId)))
 * ORDER BY created_at ASC, id ASC
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByCreatedAsc = new PreparedQuery<IGetTasksByCreatedAscParams,IGetTasksByCreatedAscResult>(getTasksByCreatedAscIR);


/** 'GetTasksByDuedateDesc' parameters type */
export interface IGetTasksByDuedateDescParams {
  pageSize: NumberOrString;
  prevDuedate?: DateOrString | null | void;
  prevId?: number | null | void;
}

/** 'GetTasksByDuedateDesc' return type */
export interface IGetTasksByDuedateDescResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByDuedateDesc' query type */
export interface IGetTasksByDuedateDescQuery {
  params: IGetTasksByDuedateDescParams;
  result: IGetTasksByDuedateDescResult;
}

const getTasksByDuedateDescIR: any = {"usedParamSet":{"prevDuedate":true,"prevId":true,"pageSize":true},"params":[{"name":"prevDuedate","required":false,"transform":{"type":"scalar"},"locs":[{"a":32,"b":43},{"a":84,"b":95},{"a":112,"b":123}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":134,"b":140}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":183,"b":192}]}],"statement":"SELECT *\nFROM tasks\nWHERE (CAST(:prevDuedate AS timestamptz) IS NULL OR (due_date < :prevDuedate OR (due_date = :prevDuedate AND id < :prevId)))\nORDER BY due_date DESC, id DESC\nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE (CAST(:prevDuedate AS timestamptz) IS NULL OR (due_date < :prevDuedate OR (due_date = :prevDuedate AND id < :prevId)))
 * ORDER BY due_date DESC, id DESC
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByDuedateDesc = new PreparedQuery<IGetTasksByDuedateDescParams,IGetTasksByDuedateDescResult>(getTasksByDuedateDescIR);


/** 'GetTasksByDuedateAsc' parameters type */
export interface IGetTasksByDuedateAscParams {
  pageSize: NumberOrString;
  prevDuedate?: DateOrString | null | void;
  prevId?: number | null | void;
}

/** 'GetTasksByDuedateAsc' return type */
export interface IGetTasksByDuedateAscResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByDuedateAsc' query type */
export interface IGetTasksByDuedateAscQuery {
  params: IGetTasksByDuedateAscParams;
  result: IGetTasksByDuedateAscResult;
}

const getTasksByDuedateAscIR: any = {"usedParamSet":{"prevDuedate":true,"prevId":true,"pageSize":true},"params":[{"name":"prevDuedate","required":false,"transform":{"type":"scalar"},"locs":[{"a":32,"b":43},{"a":84,"b":95},{"a":112,"b":123}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":134,"b":140}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":182,"b":191}]}],"statement":"SELECT *\nFROM tasks\nWHERE (CAST(:prevDuedate AS timestamptz) IS NULL OR (due_date < :prevDuedate OR (due_date = :prevDuedate AND id < :prevId)))\nORDER BY due_date ASC, id ASC \nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE (CAST(:prevDuedate AS timestamptz) IS NULL OR (due_date < :prevDuedate OR (due_date = :prevDuedate AND id < :prevId)))
 * ORDER BY due_date ASC, id ASC 
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByDuedateAsc = new PreparedQuery<IGetTasksByDuedateAscParams,IGetTasksByDuedateAscResult>(getTasksByDuedateAscIR);


/** 'GetTasksByStatusDesc' parameters type */
export interface IGetTasksByStatusDescParams {
  pageSize: NumberOrString;
  prevId?: number | null | void;
  prevStatus?: status | null | void;
}

/** 'GetTasksByStatusDesc' return type */
export interface IGetTasksByStatusDescResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByStatusDesc' query type */
export interface IGetTasksByStatusDescQuery {
  params: IGetTasksByStatusDescParams;
  result: IGetTasksByStatusDescResult;
}

const getTasksByStatusDescIR: any = {"usedParamSet":{"prevStatus":true,"prevId":true,"pageSize":true},"params":[{"name":"prevStatus","required":false,"transform":{"type":"scalar"},"locs":[{"a":32,"b":42},{"a":76,"b":86},{"a":101,"b":111}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":122,"b":128}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":169,"b":178}]}],"statement":"SELECT *\nFROM tasks\nWHERE (CAST(:prevStatus AS status) IS NULL OR (status < :prevStatus OR (status = :prevStatus AND id < :prevId)))\nORDER BY status DESC, id DESC\nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE (CAST(:prevStatus AS status) IS NULL OR (status < :prevStatus OR (status = :prevStatus AND id < :prevId)))
 * ORDER BY status DESC, id DESC
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByStatusDesc = new PreparedQuery<IGetTasksByStatusDescParams,IGetTasksByStatusDescResult>(getTasksByStatusDescIR);


/** 'GetTasksByStatusAsc' parameters type */
export interface IGetTasksByStatusAscParams {
  pageSize: NumberOrString;
  prevId?: number | null | void;
  prevStatus?: status | null | void;
}

/** 'GetTasksByStatusAsc' return type */
export interface IGetTasksByStatusAscResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByStatusAsc' query type */
export interface IGetTasksByStatusAscQuery {
  params: IGetTasksByStatusAscParams;
  result: IGetTasksByStatusAscResult;
}

const getTasksByStatusAscIR: any = {"usedParamSet":{"prevStatus":true,"prevId":true,"pageSize":true},"params":[{"name":"prevStatus","required":false,"transform":{"type":"scalar"},"locs":[{"a":32,"b":42},{"a":76,"b":86},{"a":101,"b":111}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":122,"b":128}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":168,"b":177}]}],"statement":"SELECT *\nFROM tasks\nWHERE (CAST(:prevStatus AS status) IS NULL OR (status > :prevStatus OR (status = :prevStatus AND id > :prevId)))\nORDER BY status ASC, id ASC \nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE (CAST(:prevStatus AS status) IS NULL OR (status > :prevStatus OR (status = :prevStatus AND id > :prevId)))
 * ORDER BY status ASC, id ASC 
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByStatusAsc = new PreparedQuery<IGetTasksByStatusAscParams,IGetTasksByStatusAscResult>(getTasksByStatusAscIR);


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


