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
import { WeatherForecastItem, WeatherForecast } from "../../interfaces/weater.interface";

interface Props {
 weatherData: WeatherForecast;
}
export default function WeatherCharts({ weatherData }: Props) {
 const data = weatherData.list.map((item: WeatherForecastItem) => ({
  time: item.dt,
  temperatureCelsius: convertToCelsius(item.main.temp),
  pressure: item.main.pressure,
  humidity: item.main.humidity,
  wind: item.wind.speed,
  formatTime: item.dt_txt,
 }));
 console.log(data);
 return (
  <ResponsiveContainer width="100%" height={400}>
   <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="formatTime" />
    <YAxis />
    <Tooltip formatter={(value) => [`${value}°C`]} />
    <Legend />
    <Line type="monotone" dataKey="temperatureCelsius" stroke="#8884d8" />
   </LineChart>
  </ResponsiveContainer>
 );
}
