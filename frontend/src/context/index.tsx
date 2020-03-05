import * as React from "react";
import reducer, { ReducerState, ReducerAction } from "./reducer";
import initialState from "./initialState";
import { Status } from "./reducer";

const AppContext = React.createContext<{
  state: ReducerState;
  dispatch: React.Dispatch<ReducerAction>;
}>({
  state: initialState,
  dispatch: () => {}
});

export const Provider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { Status };
export default AppContext;
