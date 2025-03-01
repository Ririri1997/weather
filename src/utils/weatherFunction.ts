import axios from "axios";
import WeatherData from "../interfaces/weater.interface";

export default async function getWeather(city: string) {
  try {

   const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
   const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   const { data } = await axios.get<WeatherData>(urlCity);
   console.log(data);
   return data;
  } catch (e) {
   console.error(e);
  }
 }

 // const lat = 50.4501;
 // const lon = 30.5236;
 // const urlLocation = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
