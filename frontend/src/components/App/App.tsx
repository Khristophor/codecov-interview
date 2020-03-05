import * as React from "react";
import Octicon from "octicons-react-ts";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Page } from "../styles";
import { Provider } from "../../context";
import Home from "../Home";

function App() {
  return (
    <Provider>
      <Router>
        <article>
          <Page>
            <Nav>
              <Ul>
                <Li>
                  <MenuItem to="/">
                    <Octicon name="repo"></Octicon>
                    <MenuText>Repositories</MenuText>
                  </MenuItem>
                </Li>
              </Ul>
            </Nav>
          </Page>

          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </article>
      </Router>
    </Provider>
  );
}

export default App;

const Nav = styled.nav`
  border-bottom: solid 2px #ebebeb;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  list-style: none;
  padding: 0;
`;

const Li = styled.li`
  flex: 1;
  max-width: 200px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;

  text-decoration: none;
  font-family: Lato;
  font-size: 14px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #081d2f;
`;

const MenuText = styled.span`
  margin: 0 0.5rem;
`;
