import { useState } from "react";
import getWeather from "./utils/weatherFunction";
import { WeatherForecast } from "./interfaces/weater.interface";
import WeaterCharts from "./components/WeatherCharts/WeatherCharts";
import CardsWeather from "./components/CardsWeather/CardsWeather";

function AppWeather() {
 const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
 const [errorMessage, setErrorMessage] = useState<string | null>(null);

 async function onChange(cityName: string) {
  if (!cityName.trim()) {
   return "Введите название города";
  }
  setErrorMessage(null);
  const data = await getWeather(cityName.trim());
  if (data) {
   console.log(data);
   setWeatherData(data);
  } else {
   console.error("No weather data found for city:", cityName);
   setErrorMessage("Не нашли такой город");
  }
 }
 function resetError() {
  setErrorMessage(null);
 }
 const resetWeatherData = () => {
  setWeatherData(null);
};
 return (
  <>
   <h1>Узнай и сравни погоду в любых городах</h1>
   <CardsWeather 
    weatherData={weatherData?.list}
    errorMessage={errorMessage}
    onChange={onChange}
    resetError={resetError}
    resetWeatherData={resetWeatherData}
   />
   {weatherData && <WeaterCharts weatherData={weatherData} />}
  </>
 );
}
export default AppWeather;
