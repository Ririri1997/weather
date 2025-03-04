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
 const errorMessages = useSelector((s: RootState) => s.weatherData.errorMessages);
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
console.log(errorMessages);
// здесь настроить логику с выводом ошибки и добавлением новой карточки без нее. То есть если с карточки город с ошибкой, то только эта карточка содержит ошибку. Может быть в selectedCities . Добавить молитву для работы кода хд
 return (
  <CardsWrapper>
   { selectedCities.length > 0 ? (
    selectedCities.map((city) => (
     <div key={city}>
      <CityInput city={city} />
      {weatherData[city] ? (
       <WeatherInfo weatherData={weatherData[city].list} />
      ) : (
       errorMessages[city] ? (
         <div>
           <ErrorMessage message={errorMessages[city]} />
         </div>
       ) : (
         <EmptyCard />
       )

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
