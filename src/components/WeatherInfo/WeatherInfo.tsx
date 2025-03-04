import { WeatherForecastItem } from "../../interfaces/weater.interface";
import convertToCelsius from "../../utils/convertToCelsius";
import { Text } from "../Text/Text.styles";
import { ImageStyled } from "../Image/Image.styles";
import { CardBody } from "../Card/Card.styles";

interface WeatherInfoProps {
 weatherData: WeatherForecastItem[];
}

export default function WeatherInfo({ weatherData }: WeatherInfoProps) {
 return (
  <CardBody $hasData={true}>
   <Text size="large" style={{ gridArea: "one" }}>
    {convertToCelsius(weatherData[0].main.temp)}°
   </Text>
   <ImageStyled
    style={{ gridArea: "two" }}
    size="large"
    src={`https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`}
    alt="Temp image"
   />
   <div style={{ gridArea: "three" }}>
    <Text>{weatherData[0].main.pressure}</Text>
    <Text size="small" color="secondary">
     давление
    </Text>
   </div>
   <div style={{ gridArea: "four" }}>
    <Text $textAlign="center">{weatherData[0].main.humidity}%</Text>
    <Text $textAlign="center" size="small" color="secondary">
     влажность
    </Text>
   </div>
   <div style={{ gridArea: "five" }}>
    <Text $textAlign="right">{weatherData[0].wind.speed}м/с</Text>
    <Text $textAlign="right" size="small" color="secondary">
     ветер
    </Text>
   </div>
  </CardBody>
 );
}
