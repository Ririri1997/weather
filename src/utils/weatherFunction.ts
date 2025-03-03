import axios from "axios";
import {WeatherData, WeatherForecast} from "../interfaces/weater.interface";

export default async function getWeather(city: string) {
 try {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await axios.get<WeatherData>(urlCity);

  const {lat, lon} = res.data.coord;
  const { data } = await axios.get<WeatherForecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  return data;
 } catch (e) {
  console.error(e);
 }
}

