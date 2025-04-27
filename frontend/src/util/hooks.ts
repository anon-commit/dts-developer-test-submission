// import { useQuery } from "@tanstack/react-query";
// import {
//   createTask,
//   getTaskById,
//   getNextPage,
//   getTaskCount,
//   updateTaskStatus,
//   deleteTask,
// } from "./fetchers";
// import type { SortOrder, SortBy, Status } from "../types";
//
// /*
//  * TODO: use `useMutation` for mutations for create and update fetches
//  */
//
// export function useCreateTask(params: {
//   title: string;
//   dueDate: string;
//   description?: string;
// }) {
//   return useQuery({
//     queryKey: ["tasks", params],
//     queryFn: () => createTask(params),
//     enabled: false,
//   });
// }
//
// export function useUpdateTaskStatus(params: { id: number; status: Status }) {
//   return useQuery({
//     queryKey: ["tasks", params],
//     queryFn: () => updateTaskStatus(params),
//     enabled: false,
//   });
// }
//
// export function useGetTaskById(id: number) {
//   return useQuery({ queryKey: ["tasks", id], queryFn: () => getTaskById(id) });
// }
//
// export function useGetNextPage(params: {
//   status: Status;
//   sortBy: SortBy;
//   sortOrder: SortOrder;
//   pageSize: number;
//   cursor?: string;
// }) {
//   return useQuery({
//     queryKey: ["tasks", params],
//     queryFn: () => getNextPage(params),
//   });
// }
//
// export function useGetTaskCount() {
//   return useQuery({
//     queryKey: ["tasks", "count"],
//     queryFn: () => getTaskCount(),
//   });
// }
// export function useDeleteTask(id: number) {
//   return useQuery({ queryKey: ["tasks", id], queryFn: () => deleteTask(id) });
// }
