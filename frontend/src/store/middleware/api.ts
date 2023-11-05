import axios from "axios";
import * as actions from "../api.ts";
import { Middleware } from "redux";

const api: Middleware =
  ({ dispatch }) =>
    (next) =>
      async (action: { type: string, payload: actions.BeganPayload }) => {

        if (action.type !== actions.apiCallBegan.type) return next(action);

        const { url, method, data, onStart, onError, onSuccess } = action.payload;

        if (onStart) {
          dispatch({ type: onStart });
        }

        next(action);

        try {
          const response = await axios.request({
            baseURL: "http://localhost:9001/api",
            url,
            method,
            data,
          });
          // General
          dispatch(actions.apiCallSuccess(response.data));
          // Specific
          if (onSuccess) {
            dispatch({ type: onSuccess, payload: response.data });
          }
        } catch (error: any) {
          // General
          dispatch(actions.apiCallFailed(error.message));
          // Specific
          if (onError) {
            console.log('err');

            dispatch({ type: onError, payload: error.response.data.message });
          }
        }
      };

export default api;
