import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  getTaskById,
  getNextPage,
  getTaskCount,
  updateTaskStatus,
  deleteTask,
} from "./fetchers";
import {
  type SortOrder,
  type SortBy,
  type Status,
  type CreateTaskParams,
  type UpdateTaskStatusParams,
  type ErrorPayload,
  type TaskResponse,
  type UpdateTaskResponse,
  type IdParam,
  type NoContentResponse,
  TaskCountResponse,
} from "../types";
import { AxiosError } from "axios";

/*
 * TODO: use `useMutation` for mutations for create and update fetches
 */

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation<TaskResponse, AxiosError<ErrorPayload>, CreateTaskParams>({
    mutationFn: (params) => createTask(params!),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", "todo"] }),
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateTaskResponse,
    AxiosError<ErrorPayload>,
    UpdateTaskStatusParams
  >({
    mutationFn: (params) => updateTaskStatus(params!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<NoContentResponse, AxiosError<ErrorPayload>, IdParam>({
    mutationFn: (params) => deleteTask(params!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useGetTaskById(id: number) {
  return useQuery<TaskResponse, AxiosError<ErrorPayload>, IdParam>({
    queryKey: ["tasks", id],
    queryFn: () => getTaskById({ id }),
  });
}

export function useGetNextPage(params: {
  status: Status;
  sortBy: SortBy;
  sortOrder: SortOrder;
  pageSize: number;
  cursor?: string;
}) {
  return useQuery<TaskResponse, AxiosError<ErrorPayload>>({
    queryKey: ["tasks", params],
    queryFn: () => getNextPage(params),
  });
}

export function useGetTaskCount() {
  return useQuery<TaskCountResponse, AxiosError<ErrorPayload>>({
    queryKey: ["tasks", "count"],
    queryFn: () => getTaskCount(),
  });
}
