import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { WeatherData, WeatherForecast } from "../interfaces/weater.interface";
import { saveState, pushCity, loadState } from "./storage";

export const CITIES_PERSISTENT_STATE = "selectedCities";

export const getWeather = createAsyncThunk(
 "weatherData/fetchWeatherData",
 async (cityName: string, { rejectWithValue }) => {
  try {
   const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
   const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
   const res = await axios.get<WeatherData>(urlCity);
   if (!res) {
    throw new Error("No coordinates found");
   }
   const { lat, lon } = res.data.coord;
   const { data } = await axios.get<WeatherForecast>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
   );
   if (!data) {
    throw new Error("No forecast data found");
   }
   // добавление в локальное хранилище
   pushCity(cityName, CITIES_PERSISTENT_STATE);
   return { cityName, data };
  } catch (error) {
   if (error) console.error("Ошибка получения данных:", error);
   if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
     return rejectWithValue("Город не найден");
    }
   }
   return rejectWithValue("Ошибка загрузки данных");
  }
 }
);

export interface WeatherDataState {
 weatherData: { [city: string]: WeatherForecast };
 loading: boolean;
 errorMessage: string | null;
 selectedCities: string[];
}

const initialState: WeatherDataState = {
 weatherData: {},
 loading: false,
 errorMessage: null,
 selectedCities: loadState(CITIES_PERSISTENT_STATE) ?? [],
};

export const weatherDataSlice = createSlice({
 name: "weatherData",
 initialState,
 reducers: {
  // чистит ошибки. Еще не используется
  resetError: (state) => {
   state.errorMessage = null;
  }, // еще не используется
  addEmptyCity: (state) => {
   state.selectedCities.push("");
  }, 
  // удаляет город из локального хранилища и selectedCities
  removeCity: (state, action: PayloadAction<string>) => {
   state.selectedCities = state.selectedCities.filter(
    (city) => city !== action.payload
   );
   state.errorMessage = null;
   saveState(state.selectedCities, CITIES_PERSISTENT_STATE);
  }, 
  // добавляет новый элемент в selectedCities если его еще нет в этом списке после добавляется в локальное хранилище
  addToLocale: (state, action: PayloadAction<string>) => {
   if (!action.payload) return;
   state.selectedCities = state.selectedCities.filter(
    (city) => city.trim() !== ""
   );
   if (!state.selectedCities.includes(action.payload)) {
    state.selectedCities.push(action.payload);
   }
   saveState(state.selectedCities, CITIES_PERSISTENT_STATE);
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(getWeather.pending, (state) => {
    state.loading = true;
    state.errorMessage = null;
   })
   .addCase(getWeather.fulfilled, (state, action) => {
    if (action.payload) {
     const { cityName, data } = action.payload;
     if (!state.weatherData[cityName]) {
      state.weatherData[cityName] = data;
     }
    }
    state.loading = false;
   })
   .addCase(getWeather.rejected, (state) => {
    state.loading = false;
    state.errorMessage = "Не нашли такой город";
   });
 },
});

export const weatherDataActions = weatherDataSlice.actions;
export default weatherDataSlice.reducer;
