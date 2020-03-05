import { useCallback, useContext } from "react";
import axios from "axios";
import context, { Status } from "../context";
import { ReducerState } from "../context/reducer";

const useApiRequest = (
  endpoint: string,
  { verb = "get", params = {} } = {}
): [ReducerState, () => Promise<void>] => {
  const { state, dispatch } = useContext(context);

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
