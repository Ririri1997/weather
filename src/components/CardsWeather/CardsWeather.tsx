import CityInput from "../CityInput/CityInput";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getWeather } from "../../store/weatherData.slice";
import EmptyCard from "../EmptyCard/EmptyCard";
import { CardsWrapper } from "../Card/Card.styles";


export default function CardsWeather() {
 const dispatch = useDispatch<AppDispatch>();
 const weatherData = useSelector((s: RootState) => s.weatherData.weatherData);
 const errorMessage = useSelector((s: RootState) => s.weatherData.errorMessage);
 const selectedCities = useSelector(
  (s: RootState) => s.weatherData.selectedCities
 );


 useEffect(() => {
  if (!selectedCities || selectedCities.length === 0) return;

  selectedCities.forEach((city) => {
    if (city !== "" && !weatherData[city]) {
      dispatch(getWeather(city));
    }
  });
}, []); 


 return (
  <CardsWrapper>
   { selectedCities.length > 0 ? (
    selectedCities.map((city) => (
     <div key={city}>
      <CityInput city={city} />
      {weatherData[city] ? (
       <WeatherInfo weatherData={weatherData[city].list} />
      ) : (
       errorMessage ? <ErrorMessage message={errorMessage}/> : <EmptyCard /> 
      )}
     </div>
    ))
   ) : (
    <div>
     <CityInput city={""} />
    <EmptyCard /> 
    </div>
   )}
  </CardsWrapper>
 );
}
