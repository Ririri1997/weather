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


export default function WeatherCharts() {
 const weatherData = useSelector((s: RootState)=> s.weatherData.weatherData)
 const data = weatherData ? weatherData.list.map((item: WeatherForecastItem) => ({
  time: item.dt,
  temperatureCelsius: convertToCelsius(item.main.temp),
  pressure: item.main.pressure,
  humidity: item.main.humidity,
  wind: item.wind.speed,
  formatTime: item.dt_txt,
 })) : [];

 console.log(data);
 return (
  <ChartWrapper>
  
  {weatherData ? (<ResponsiveContainer width="60%" height={400}>
   <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="formatTime" />
    <YAxis />
    <Tooltip formatter={(value) => [`${value}°C`]} />
    <Legend />
    <Line type="monotone" dataKey="temperatureCelsius" stroke="#8884d8" />
   </LineChart>
  </ResponsiveContainer>) : (
   <p>clg</p>
  ) }
  </ChartWrapper>
 );
}
