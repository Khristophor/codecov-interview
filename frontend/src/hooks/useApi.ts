import { useCallback, useReducer } from "react";
import axios from "axios";
import { Status } from "../context";
import reducer, { ReducerState } from "../context/reducer";

const useApiRequest = (
  endpoint: string,
  { verb = "get", params = {} } = {}
): [ReducerState, () => Promise<void>] => {
  const [state, dispatch] = useReducer(reducer, {});

  const makeRequest = useCallback(async () => {
    dispatch({ type: Status.FETCHING });
    try {
      let api = axios.get;
      // Work around axios types not supporting axios[verb]
      if (verb === "get") {
        api = axios.get;
      } else if (verb === "post") {
        api = axios.post;
      }
      const response = await api(endpoint, params);
      dispatch({ type: Status.SUCCESS, response });
    } catch (e) {
      dispatch({ type: Status.ERROR, response: e });
    }
  }, [dispatch, endpoint, params, verb]);

  return [state, makeRequest];
};

export default useApiRequest;
