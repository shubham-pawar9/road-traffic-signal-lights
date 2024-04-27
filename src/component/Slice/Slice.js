import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signalData: [
    {
      id: "1",
      signalPosition: "right",
      value: "green",
      oppositedirection: "left",
      oppositeValue: "green",
    },
    {
      id: "2",
      signalPosition: "bottom",
      value: "red",
      oppositedirection: "top",
      oppositeValue: "green",
    },
    {
      id: "3",
      signalPosition: "left",
      value: "red",
      oppositedirection: "right",
      oppositeValue: "green",
    },
    {
      id: "4",
      signalPosition: "top",
      value: "red",
      oppositedirection: "bottom",
      oppositeValue: "green",
    },
  ],
};
const signalSlice = createSlice({
  name: "signal",
  initialState,
  reducers: {
    checkSignalStatus: (state, action) => {
      const {
        signalSide,
        signalValue,
        otherSideValue,
        signalCount,
        oppositedirection,
      } = action.payload;
      state.signalData.forEach((item, i) => {
        if (item.signalPosition == signalSide) {
          item.count = signalCount[i];
          item.value = signalValue;
          item.oppositedirection = oppositedirection;
          item.oppositeValue = signalValue;
        } else {
          item.value = otherSideValue;
          item.oppositeValue = signalValue;
        }
      });
    },
  },
});
export const { checkSignalStatus } = signalSlice.actions;
export default signalSlice.reducer;
