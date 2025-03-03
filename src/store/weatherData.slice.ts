import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { WeatherData, WeatherForecast } from "../interfaces/weater.interface";


export const getWeather = createAsyncThunk(
 "weatherData/fetchWeatherData",
 async (city: string, { rejectWithValue }) => {
  try {
   const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
   const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


   const res = await axios.get<WeatherData>(urlCity);
   if (!res) {
    throw new Error("No coordinates found");
   }

   const { lat, lon } = res.data.coord;

   const { data } = await axios.get<WeatherForecast>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
   );

   if (!data) {
    console.log(4);
    throw new Error("No forecast data found");
   }
   return data;
  } catch(error) {
   if(error )
   console.error("Ошибка получения данных:", error);

   if (error instanceof  AxiosError) {
    if (error.response?.status === 404) {
      return rejectWithValue("Город не найден");
    }
  }
  return rejectWithValue("Ошибка загрузки данных");
 }
 }
);

export interface WeatherDataState {
 weatherData: WeatherForecast | null;
 loading: boolean;
 errorMessage: string | null;
 city: string | null;
}

const initialState: WeatherDataState = {
 weatherData: null,
 loading: false,
 errorMessage: null,
 city: null,
};

export const weatherDataSlice = createSlice({
 name: "weatherData",
 initialState,
 reducers: {
  resetWeatherData: (state) => {
   state.weatherData = null;
   state.city = null;
  },
  resetError: (state) => {
   state.errorMessage = null;
  },
  setCity: (state, action) => {
   state.city = action.payload;
   state.errorMessage = null;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(getWeather.pending, (state) => {
    state.loading = true;
    state.errorMessage = null;
   })
   .addCase(getWeather.fulfilled, (state, action) => {
    state.weatherData = action.payload;
    state.loading = false;
   })
   .addCase(getWeather.rejected, (state) => {
    state.loading = false;
    state.errorMessage = "Не нашли такой город";
    state.weatherData = null;
   });
 },
});

export const weatherDataActions = weatherDataSlice.actions;
export default weatherDataSlice.reducer;
