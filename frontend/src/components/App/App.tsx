import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "../../context";
import Example from "../Example";
import Home from "../Home";

function App() {
  return (
    <Provider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/example">Example</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/example">
              <Example />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
