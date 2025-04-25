import * as React from "react";
import * as GovUK from "govuk-react";
import { MemoryRouter as Router, Routes, Route } from "react-router";
import { Link } from "react-router-dom";

import Home from "./home";

const App: React.FC<ExampleApplicationProps> = ({
  routerEntries,
}: ExampleApplicationProps) => (
  <React.StrictMode>
    <Router initialEntries={routerEntries}>
      <GovUK.GlobalStyle />
      <GovUK.TopNav
        serviceTitle={
          <GovUK.TopNav.Anchor as={Link} to="/">
            React
          </GovUK.TopNav.Anchor>
        }
      >
        <GovUK.TopNav.NavLink as={Link} to="/">
          Home
        </GovUK.TopNav.NavLink>
        <GovUK.TopNav.NavLink as={Link} to="/forms">
          Forms
        </GovUK.TopNav.NavLink>
      </GovUK.TopNav>
      <GovUK.Page.WidthContainer>
        <GovUK.Page.Main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </GovUK.Page.Main>
      </GovUK.Page.WidthContainer>
      <GovUK.Footer />
    </Router>
  </React.StrictMode>
);

export interface ExampleApplicationProps {
  routerEntries?: string[];
}

export default App;
