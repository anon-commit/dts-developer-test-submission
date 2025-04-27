import { Status } from "../types";

export function statusEnumToDisplay(status: Status) {
  const statusMapper = {
    TODO: "To do",
    IN_PROGRESS: "In progress",
    DONE: "Done",
  };

  return statusMapper[status];
}
