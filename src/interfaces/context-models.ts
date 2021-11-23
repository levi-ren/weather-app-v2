import { Dispatch } from "react";
import { Actions, IWeatherReducer } from "../context/reducers";

export interface IWeatherContext extends IWeatherReducer {
  dispatch: Dispatch<{
    type: Actions;
    payload?: any;
  }>;
}
