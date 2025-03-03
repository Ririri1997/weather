import { CardBody, CardsWrapper } from "../Card/Card.styles";
import { Text } from "../Text/Text.styles";
import { ImageStyled } from "../Image/Image.styles";
import CityInput from "../CityInput/CityInput";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";



export default function CardsWeather() {


 const  weatherData = useSelector((s:RootState)=> s.weatherData.weatherData?.list);
 const  errorMessage = useSelector((s:RootState)=> s.weatherData.errorMessage)



 return (
  <CardsWrapper>
   <div>
    <CityInput />
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
