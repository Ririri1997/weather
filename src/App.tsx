
import CardsWeather from "./components/CardsWeather/CardsWeather";
import { Header } from "./components/Header/Header.styles";
import { Title } from "./components/Title/Title.styles";
import Button from "./components/Button/Button.styles";
import WeatherCharts from "./components/WeatherCharts/WeatherCharts";

function AppWeather() {

 function addCity() {
  // Здесь будет добавляться город. При добавлении он будет сразу добавляться в локальное хранилище и в зависимости от количества добавленных городов (но до 4х) будет добавляться карточки CardsWeather с указанными городами. При количестве городов более 4х будет удаляться кнопка  <Button onClick={addCity}>Добавить город</Button>
  // судя по всему уже желательно добавлять редакс для управления состояниеми
 }

 return (
  <>
   <Header>
    <Title>Узнай и сравни погоду в любых городах</Title>
    <Button onClick={addCity}>Добавить город</Button>
   </Header>
   <CardsWeather/>
  <WeatherCharts />
  </>
 );
}
export default AppWeather;
