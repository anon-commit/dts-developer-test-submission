import * as GovUK from "govuk-react";
import CreateTaskButton from "./components/CreateTaskButton";

function Home() {
  return (
    <>
      <GovUK.H2>Task manager</GovUK.H2>
      <CreateTaskButton />
    </>
  );
}

export default Home;
