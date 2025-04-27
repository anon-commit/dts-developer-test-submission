/*
 * TEMPORARY
 * These are duplicates of types that already exist on the backend.
 * TODO: remove these later and pull the types directly from the backend.
 */

export type Status = "TODO" | "IN_PROGRESS" | "DONE";
export type SortBy = "created" | "status" | "dueDate";
export type SortOrder = "ASC" | "DESC";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  due_date: Date;
  created_at: Date;
};
