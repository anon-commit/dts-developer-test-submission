import * as GovUK from "govuk-react";
import AddTaskButton from "./components/AddTaskButton";

function Home() {
  return (
    <>
      <GovUK.H2>Task manager</GovUK.H2>
      <AddTaskButton />
    </>
  );
}

export default Home;
