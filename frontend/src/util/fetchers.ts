import axios from "axios";
import type { Status, SortBy, SortOrder } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000/api/tasks",
});

export function createTask(params: {
  title: string;
  dueDate: string;
  dueTime: string;
  description?: string;
}) {
  const isoDateTime = new Date(
    `${params.dueDate}T${params.dueTime}`,
  ).toISOString();
  return api.post("", {
    title: params.title,
    description: params.description,
    due_date: isoDateTime,
  });
}

export function getTaskById(id: number) {
  return api.get(`/${id}`);
}

export function getNextPage(params: {
  status: Status;
  sortBy: SortBy;
  sortOrder: SortOrder;
  pageSize: number;
  cursor?: string;
}) {
  return api.get(`/page`, {
    status: params.status,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    pageSize: params.pageSize,
    cursor: params.cursor,
  });
}

export function getTaskCount() {
  return api.get("/count");
}

export function updateTaskStatus(params: { id: number; status: Status }) {
  return api.patch(`/status/${params.id}`, {
    data: {
      status: params.status,
    },
  });
}

export function deleteTask(id: number) {
  return api.delete(`/${id}`);
}
