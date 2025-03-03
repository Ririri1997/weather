import {
 LineChart,
 XAxis,
 YAxis,
 Tooltip,
 Line,
 Legend,
 CartesianGrid,
 ResponsiveContainer
} from "recharts";

export default function WeaterCharts({ weatherData }: any) {
 const data = weatherData.map((item: any) => ({
  time: item.dt,
  temperatureCelsius: Math.round(item.main.temp-273.15),
  pressure: item.main.pressure,
  humidity: item.main.humidity,
  wind: item.main.speed,
  formatTime: item.dt_txt
 }))
 console.log(data);
 return (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="formatTime" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="temperatureCelsius" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
 );
}
