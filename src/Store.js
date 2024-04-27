import { configureStore } from "@reduxjs/toolkit";
import signalReducer from "./component/Slice/Slice";
export default configureStore({
  reducer: {
    signal: signalReducer,
  },
});
