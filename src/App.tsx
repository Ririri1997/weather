import { useState } from "react";
import getWeather from "./utils/weatherFunction";
import {WeatherForecast} from "./interfaces/weater.interface";
import WeaterCharts from "./components/WeaterCharts/WeaterCharts";
import CardsWeather from "./components/CityInput/CardsWeather";


function AppWeather() {
 const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);


 async function onChange(cityName: string) {
  if (!cityName.trim()) {
   return 'Введите название города';
 }
  const data = await getWeather(cityName);
  if (data) {
   console.log(data);
   setWeatherData(data);
  } else {
   console.error("No weather data found for city:", cityName);
  }
 }

 return (
  <>
   <h1>Узнай и сравни погоду в любых городах</h1>
    <CardsWeather weatherData={weatherData?.list} onChange={onChange} />
   {weatherData && <WeaterCharts weatherData={weatherData}/>}
  </>
 );
}
export default AppWeather;
