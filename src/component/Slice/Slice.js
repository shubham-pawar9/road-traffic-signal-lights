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
      cars: ["car1", "car2", "car3", "truck1"],
      position: ["0px", "120px", "220px", "550px"],
    },
    {
      id: "bottom",
      cars: ["car1", "car2", "car3", "truck2"],
      position: ["800px", "980px", "1820px", "3090px"],
    },
    {
      id: "left",
      cars: ["car1", "car2", "car3", "truck3"],
      position: ["1000px", "1420px", "2000px", "3800px"],
    },
    {
      id: "top",
      cars: ["car1", "car2", "car3", "truck1"],
      position: ["1200px", "1900px", "2890px", "5200px"],
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
