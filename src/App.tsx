import { useState, useEffect } from "react";
import CityInput from "./components/CityInput/CityInput";
import getWeather from "./utils/weatherFunction";
import WeatherData from "./interfaces/weater.interface";

function AppWeather() {
 // const [city, setCity] = useState('');
 const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

 useEffect(() => {
  if (weatherData && weatherData.main) {
   
 const tempCelsius = weatherData.main.temp -273.15;
   console.log("Temperature:", weatherData.main.temp);
   
   console.log("Temperature C:", tempCelsius);
  }
 }, [weatherData]);

 async function onChange(cityName: string) {
  const data = await getWeather(cityName);
  if (data) {
   setWeatherData(data);
  } else {
   console.error("No weather data found for city:", cityName);
  }
 }

 return (
  <>
   <h1>Погода плохая погооодаа погоода совсем никуда. Никуда никудааа не скрыыыться наам </h1>
   <CityInput onChange={onChange} />
   <img src="https://openweathermap.org/img/wn/04n@2x.png" alt="" />
  </>
 );
}
export default AppWeather;
