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
  carsData: [
    {
      id: "right",
      cars: ["car1", "car2", "car3", "car4"],
      position: ["0px", "120px", "220px", "380px"],
    },
    {
      id: "bottom",
      cars: ["car1", "car2", "car3"],
      position: ["240px", "300px", "360px"],
    },
    {
      id: "left",
      cars: ["car1", "car2", "car3"],
      position: ["240px", "360px", "480px"],
    },
    {
      id: "top",
      cars: ["car1", "car2", "car3"],
      position: ["420px", "480px", "540px"],
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
    carsStatus: (state, action) => {
      const { othersData } = action.payload;
      state.carsData = othersData;
      // state.carsData.forEach((item, i) => {
      //   if (item.id == id) {
      //     item.position = position;
      //   }
      // });
    },
  },
});
export const { checkSignalStatus, carsStatus } = signalSlice.actions;
export default signalSlice.reducer;
