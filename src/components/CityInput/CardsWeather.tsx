import { useState } from "react";
import Input from "./Input.styles";
import Button from "../Button/Button.styles";
import { CardBody, CardHeader, CardsWrapper } from "../Card/Card.styles";
import { WeatherForecastItem } from "../../interfaces/weater.interface";
import convertToCelsius from "../../utils/convertToCelsius";
import { Text } from "../Text/Text.styles";
import { ImageStyled } from "../Image/Image.styles";

interface CardsWeatherProps {
 weatherData?: WeatherForecastItem[] | null;
 onChange: (city: string) => void;
}

export default function CardsWeather({
 weatherData,
 onChange,
}: CardsWeatherProps) {
 const [city, setCity] = useState<string>("");

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setCity(e.target.value);
 };

 function save(e: React.FormEvent) {
  e.preventDefault();
  onChange(city);
 }
 function reset(e: React.FormEvent) {
  e.preventDefault();
  setCity("");
 }

 const hasData = weatherData?.[0]?.main?.temp !== undefined;
 console.log(hasData);
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
    {weatherData?.[0]?.main?.temp !== undefined ? (
     <CardBody $hasData={hasData}>
      <Text size="large">{convertToCelsius(weatherData[0].main.temp)}°C</Text>
      <ImageStyled
       size="large"
       src={`https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`}
       alt="Temp image"
      />
      <Text size="small">{weatherData[0].main.pressure} давление</Text>
      <Text size="small">{weatherData[0].main.humidity}% влажность</Text>
      <Text size="small">{weatherData[0].wind.speed}м/с ветер</Text>
      
     </CardBody>
    ) : (
     <CardBody $hasData={hasData}>
      <ImageStyled src="./cloud-sun.svg" alt="Cloud" />
      <Text size="small" color="secondary" $textAlign="center">
       Напиши название города,
       <br />
       чтобы увидеть погоду
      </Text>
     </CardBody>
    )}
   </div>
  </CardsWrapper>
 );
}
