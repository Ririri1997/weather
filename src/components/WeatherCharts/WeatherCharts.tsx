import {
 LineChart,
 XAxis,
 YAxis,
 Tooltip,
 Line,
 Legend,
 CartesianGrid,
 ResponsiveContainer,
} from "recharts";
import convertToCelsius from "../../utils/convertToCelsius";
import { WeatherForecastItem } from "../../interfaces/weater.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ChartWrapper from "./ChartWrapper.styles";
import Switcher from "../Switcher/Switcher";

export default function WeatherCharts() {
 const weatherData = useSelector((s: RootState) => s.weatherData.weatherData);
 const selectedCities = useSelector((s: RootState) => s.weatherData.selectedCities);

 //  данные для всех городов
 const citiesData = selectedCities.map((city) => {
   const cityData = weatherData[city];
   if (!cityData || !cityData.list) return null;

   return cityData.list.map((item: WeatherForecastItem) => ({
     time: item.dt,
     [city]: convertToCelsius(item.main.temp),
     formatTime: item.dt_txt,
   }));
 });


 const mergedData = citiesData[0]
   ? citiesData[0].map((_, index) =>
       citiesData.reduce((acc, cityData) => {
         if (cityData && cityData[index]) {
           acc = { ...acc, ...cityData[index] };
         } 
         return acc;
        }, { time: citiesData[0] && citiesData[0][index]?.time })
     )
   : [];

 const generateRandomColor = () => {
   const letters = "0123456789ABCDEF";
   let color = "#";
   for (let i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
 };

 return (
   <ChartWrapper>
     <Switcher onChange={(value) => console.log("Выбрано:", value)} />

     {weatherData && mergedData.length > 0 ? (
       <ResponsiveContainer width="100%" height={400}>
         <LineChart data={mergedData}>
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="formatTime" />
           <YAxis />
           <Tooltip
             formatter={(value, name) => {
               return [`${value}°C`, name];
             }}
           />
           <Legend />
           {selectedCities.map((city, index) => (
             <Line
               key={city+index}
               type="monotone"
               dataKey={city}
               stroke={generateRandomColor()}
             />
           ))}
         </LineChart>
       </ResponsiveContainer>
     ) : (
       <p>Нет данных для выбранных городов</p>
     )}
   </ChartWrapper>
 );
}
