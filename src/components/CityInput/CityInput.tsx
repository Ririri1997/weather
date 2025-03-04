import { ChangeEvent, useState } from "react";
import Input from "./Input.styles";
import Button from "../Button/Button.styles";
import { CardHeader } from "../Card/Card.styles";
import { getWeather, weatherDataActions } from "../../store/weatherData.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

interface CityInputProps {
 city?: string | null;
}

export default function CityInput({ city = null }: CityInputProps) {
 const [inputValue, setInputValue] = useState(city || "");

 const dispatch = useDispatch<AppDispatch>();
// при изменении мы должны так же перезаписывать вместо того города, который переписываем, заменять на новое значение То есть удалить город до и добавить город после 
 function handleChange(e: ChangeEvent<HTMLInputElement>) {

  setInputValue(e.target.value);
 }

 const onSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const formattedCity = inputValue.trim().toLocaleLowerCase()

  if (formattedCity) {
   if(city){
    dispatch(weatherDataActions.removeCity(city));
   }

   dispatch(getWeather(formattedCity));
   dispatch(weatherDataActions.addToLocale(formattedCity));
  }
 };
 return (
  <CardHeader
   onSubmit={onSubmit}
   onReset={() => {
    dispatch(weatherDataActions.removeCity(city || ""));
   }}
  >
   <Input
    value={inputValue}
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
