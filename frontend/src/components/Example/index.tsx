import * as React from "react";
import Octicon from "octicons-react-ts";
import useApiRequest from "../../hooks/useApi";
import { Status } from "../../context";

export default function Example() {
  const [state, makeRequest] = useApiRequest(
    `https://pokeapi.co/api/v2/pokemon/ditto/`,
    {
      verb: "get"
    }
  );
  return (
    <div>
      <Octicon name="octoface" />
      <button onClick={() => makeRequest()}>Click me</button>
      {state.status === Status.FETCHING && <div>Fetching...</div>}
      {state.status === Status.SUCCESS && (
        <div>
          <div>{state?.response?.data?.name}</div>
        </div>
      )}
      {state.status === Status.ERROR && (
        <div>
          <div>{JSON.stringify(state.response)}</div>
        </div>
      )}
    </div>
  );
}
