import { ChangeEvent } from "react";
import Input from "./Input.styles";
import Button from "../Button/Button.styles";
import { CardHeader } from "../Card/Card.styles";
import { getWeather, weatherDataActions } from "../../store/weatherData.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

export default function CityInput() {
 const city = useSelector((s: RootState) => s.weatherData.city) ?? "";
 const dispatch = useDispatch<AppDispatch>();

 function handleChange(e: ChangeEvent<HTMLInputElement>) {
  dispatch(weatherDataActions.setCity(e.target.value));
 }
 async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  dispatch(weatherDataActions.resetError());

  try {
   if (city) {
    dispatch(getWeather(city.trim()));
   }
  } catch (e) {
   console.error("Ошибка получения данных:", e);
  }
 }
 return (
  <CardHeader
   onSubmit={onSubmit}
   onReset={() => {
    dispatch(weatherDataActions.resetWeatherData());
   }}
  >
   <Input
    value={city}
    placeholder="Город"
    onChange={handleChange}
    type="text"
   />
   <Button type="reset" content="image">
    <img src="./trash-icon.svg" alt="button delete" />
   </Button>
  </CardHeader>
 );
}
