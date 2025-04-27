import * as React from "react";
import * as GovUK from "govuk-react";

import Home from "./Home";

function App() {
  return (
    <React.StrictMode>
      <GovUK.GlobalStyle />
      <GovUK.TopNav></GovUK.TopNav>
      <GovUK.Page.WidthContainer>
        <GovUK.Page.Main>
          <Home />
        </GovUK.Page.Main>
      </GovUK.Page.WidthContainer>
      <GovUK.Footer />
    </React.StrictMode>
  );
}

export default App;
