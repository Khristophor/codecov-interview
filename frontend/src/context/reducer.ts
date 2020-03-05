import { AxiosResponse } from "axios";

export enum Status {
  INACTIVE,
  FETCHING,
  SUCCESS,
  ERROR
}

export interface ReducerState {
  status?: Status;
  response?: AxiosResponse<any>;
}

export type ReducerAction =
  | { type: Status.INACTIVE }
  | { type: Status.FETCHING }
  | { type: Status.SUCCESS; response: AxiosResponse<any> }
  | { type: Status.ERROR; response: AxiosResponse<any> };

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case Status.INACTIVE:
      return { ...state, status: Status.INACTIVE };
    case Status.FETCHING:
      return { ...state, status: Status.FETCHING };
    case Status.SUCCESS:
      return { ...state, status: Status.SUCCESS, response: action.response };
    case Status.ERROR:
      return { ...state, status: Status.ERROR, response: action.response };
    default:
      return state;
  }
}

export default reducer;
