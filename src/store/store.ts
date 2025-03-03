import { configureStore } from "@reduxjs/toolkit";
import weatherDataSlice from "./weatherData.slice";

export const store = configureStore({
 reducer: {
  weatherData: weatherDataSlice, 
 }
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;