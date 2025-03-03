import { useState } from "react";
import { CardBody, CardsWrapper } from "../Card/Card.styles";
import { WeatherForecastItem } from "../../interfaces/weater.interface";
import { Text } from "../Text/Text.styles";
import { ImageStyled } from "../Image/Image.styles";
import CityInput from "../CityInput/CityInput";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface CardsWeatherProps {
 errorMessage?: string | null;
 weatherData?: WeatherForecastItem[] | null;
 onChange: (city: string) => void;
 resetError: () => void;
 resetWeatherData: () => void;
}

export default function CardsWeather({
 errorMessage = null,
 weatherData,
 onChange,
 resetError,
 resetWeatherData
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
  resetError();
  resetWeatherData(); 
 }

 return (
  <CardsWrapper>
   <div>
    <CityInput city={city} onChange={handleChange} onSubmit={save} onReset={reset}/>
    {errorMessage ? (
     <ErrorMessage message={errorMessage}/>
    ) : weatherData ? (
     <WeatherInfo weatherData={weatherData}/>
    ) : (
     <CardBody $hasData={false}>
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
