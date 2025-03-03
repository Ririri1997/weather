import { useState, useEffect } from "react";
import Input from "./Input.styles";
import Button from "../Button/Button.styles";
import { CardBody, CardHeader, CardsWrapper } from "../Card/Card.styles";
import { WeatherForecastItem } from "../../interfaces/weater.interface";

interface CardsWeatherProps {
 weatherData?: WeatherForecastItem[]| null;
 onChange: (city: string) => void;
}

export default function CardsWeather({ weatherData, onChange }: CardsWeatherProps) {
 const [city, setСity] = useState<string>("");
 const [temp, setTemp] = useState<number | null>(null);

 useEffect(() => {
  if (weatherData && weatherData.length > 0) {
    setTemp(weatherData[0].main.temp - 273.15);
  }
 }, [weatherData]);
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setСity(e.target.value);
 };

 function save(e: React.FormEvent) {
  e.preventDefault();
  onChange(city);
 }
 function reset(e: React.FormEvent) {
  e.preventDefault();
  setСity('');
  onChange('');
 }

 return (
  <CardsWrapper>
   <div>
    <CardHeader onSubmit={save} onReset={reset}>
     <Input
      value={city}
      placeholder="Город"
      onChange={handleChange}
      type="text"
     />
     <Button type="reset">
      <img src="./trash-icon.svg" alt="button delete" />
     </Button>
    </CardHeader>
    <CardBody>
     {weatherData && <p>{temp}</p>}
    </CardBody>
    </div>
  </CardsWrapper>
 );
}
