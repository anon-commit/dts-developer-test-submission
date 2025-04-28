import * as GovUK from "govuk-react";
import type { Status } from "../types";
import { useGetNextPage } from "../util/hooks";
import { statusEnumToDisplay } from "../util/helpers";
import ModalButton from "./ModalButton";
import SelectStatusForm from "./SelectStatusForm";
import "../style/globals.css";

function TaskSection({ status }: { status: Status }) {
  const { isPending, error, data } = useGetNextPage({
    status,
    sortBy: "created",
    sortOrder: "DESC",
    pageSize: 5,
  });

  if (isPending) {
    return <GovUK.Paragraph>Loading tasks...</GovUK.Paragraph>;
  }

  if (!data || data.data.tasks.length === 0) {
    return (
      <>
        <GovUK.H3>{statusEnumToDisplay(status)}</GovUK.H3>
        <GovUK.Paragraph>No tasks found.</GovUK.Paragraph>
      </>
    );
  }

  return (
    <>
      <GovUK.H3>{statusEnumToDisplay(status)}</GovUK.H3>

      <div className="tasks-table">
        <div className="tasks-header-row">
          <div className="tasks-cell" style={{ width: "25%" }}>
            Title
          </div>
          <div className="tasks-cell" style={{ width: "50%" }}>
            Description
          </div>
          <div className="tasks-cell" style={{ width: "12.5%" }}>
            Due date
          </div>
          <div className="tasks-cell" style={{ width: "12.5%" }}>
            Created at
          </div>
          <div className="tasks-cell" style={{ width: "12.5%" }}></div>
        </div>
        {data.data.tasks.map((task) => {
          const dueDate = new Date(task.due_date);
          const dueDateStr = dueDate.toLocaleDateString();
          const dueTimeStr = dueDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const createdDate = new Date(task.created_at);
          const createdDateStr = createdDate.toLocaleDateString();
          const createdTimeStr = createdDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={task.id} className="tasks-row">
              <div className="tasks-cell">{task.title}</div>
              <div className="tasks-cell">{task.description}</div>
              <div className="tasks-cell">
                {dueDateStr}, {dueTimeStr}
              </div>
              <div className="tasks-cell">
                {createdDateStr}, {createdTimeStr}
              </div>
              <div className="tasks-cell">
                <ModalButton text="Move" colour="#1d70b8">
                  <SelectStatusForm id={task.id} status={status} />
                </ModalButton>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TaskSection;
