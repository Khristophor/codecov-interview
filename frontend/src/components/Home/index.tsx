import * as React from "react";
import context, { Status } from "../../context";

export default function Home() {
  const { state, dispatch } = React.useContext(context);
  return (
    <div>
      <h3 onClick={() => dispatch({ type: Status.FETCHING })}>Home</h3>
      {state.status}
    </div>
  );
}
