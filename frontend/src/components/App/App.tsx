import * as React from "react";
import Octicon from "octicons-react-ts";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "../../context";
import Home from "../Home";

function App() {
  return (
    <Provider>
      <Router>
        <article>
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <Octicon name="repo"></Octicon>Repositories
                </Link>
              </li>
            </ul>
          </nav>

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
