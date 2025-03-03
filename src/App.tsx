import { useState } from "react";
import getWeather from "./utils/weatherFunction";
import {WeatherForecast} from "./interfaces/weater.interface";
import WeaterCharts from "./components/WeaterCharts/WeaterCharts";
import CardsWeather from "./components/CityInput/CardsWeather";


function AppWeather() {
 const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);


 async function onChange(cityName: string) {
  const data = await getWeather(cityName);
  console.log(data);
  if (data) {
   setWeatherData(data);
  } else {
   console.error("No weather data found for city:", cityName);
  }
 }

 return (
  <>
   <h1>Погода плохая погооодаа погоода совсем никуда. Никуда никудааа не скрыыыться наам </h1>
    <CardsWeather weatherData={weatherData?.list} onChange={onChange} />
   <img src="https://openweathermap.org/img/wn/04n@2x.png" alt="" />
   {weatherData && <WeaterCharts weatherData={weatherData.list}/>}
  </>
 );
}
export default AppWeather;
