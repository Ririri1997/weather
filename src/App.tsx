import CardsWeather from "./components/CardsWeather/CardsWeather";
import { Header } from "./components/Header/Header.styles";
import { H1, H2 } from "./components/Title/Title.styles";
import Button from "./components/Button/Button.styles";
import { useDispatch, useSelector } from "react-redux";
import WeatherCharts from "./components/WeatherCharts/WeatherCharts";
import { AppDispatch, RootState } from "./store/store";
import { weatherDataActions } from "./store/weatherData.slice";
import { useEffect, useState } from "react";

function AppWeather() {
 const [emptyCard, setEmptyCard] = useState<boolean>(false);
 const selectedCities = useSelector(
  (s: RootState) => s.weatherData.selectedCities
 );
 

 useEffect(() => {
  if(selectedCities.length >=4){
   setEmptyCard(true);
   console.log('enought', emptyCard);
   return
  }
  selectedCities.forEach((city) => {
   if (city ==="" ) {
    setEmptyCard(true);
   }else {
    setEmptyCard(false);
   }
 });
 }, [selectedCities]);
 
 
 const dispatch = useDispatch<AppDispatch>();

 const handleAddCity = () => {
  if (!emptyCard) {
   dispatch(weatherDataActions.addEmptyCity());
  }
 };

 return (
  <>
   <Header>
    <H1>Узнай и сравни погоду в любых городах</H1>
    {!emptyCard && <Button onClick={() => handleAddCity()}>Добавить город</Button>}
   </Header>
   <CardsWeather />
   <H2>Прогноз на 6 дней</H2>
   <WeatherCharts />
  </>
 );
}
export default AppWeather;
