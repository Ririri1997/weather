import { useState, useMemo } from "react";
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
import {ChartWrapper, ChartTop} from "./ChartWrapper.styles";
import Switcher from "../Switcher/Switcher";
import Select from "../Select/Select";

// Интерфейс для данных графика
interface MergedDataItem {
  time: number;
  formatTime: string;
  [city: string]: number | string;
}

export default function WeatherCharts() {
  const weatherData = useSelector((s: RootState) => s.weatherData.weatherData);
  const selectedCities = useSelector(
    (s: RootState) => s.weatherData.selectedCities
  );
  const [timeRange, setTimeRange] = useState("3h");
  const [weatherParameter, setWeatherParameter] = useState("temp");

  // Фильтрация данных по временным диапазонам
  const filterWeatherData = (data: MergedDataItem[], range: string) => {
    if (!data || data.length === 0) return [];

    const now = new Date();

    switch (range) {
      case "5d":
        return data.filter((_, index) => index % 8 === 0);
      case "6h":
        return data.filter((_, index) => index % 2 === 0);
      case "3h":
        return data.filter((item) => {
          const itemDate = new Date(item.formatTime);
          return (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60) <= 24;
        });
      default:
        return data;
    }
  };

  // Объединение данных по городам
  const citiesData = useMemo(
    () =>
      selectedCities
        .map((city) => {
          const cityData = weatherData[city];
          if (!cityData || !cityData.list) return null;

          return cityData.list.map((item: WeatherForecastItem) => ({
            time: item.dt,
            formatTime: item.dt_txt,
            [city]:
              weatherParameter === "temp"
                ? convertToCelsius(item.main.temp)
                : weatherParameter === "humidity"
                ? item.main.humidity
                : item.main.pressure,
          }));
        })
        .filter(Boolean) as MergedDataItem[][],
    [selectedCities, weatherData, weatherParameter]
  );

  // Объединенные данные
  const mergedData: MergedDataItem[] = useMemo(
    () =>
      citiesData.length > 0
        ? citiesData[0].map((_, index) =>
            citiesData.reduce(
              (acc, cityData) => {
                if (cityData && cityData[index]) {
                  acc = { ...acc, ...cityData[index] };
                }
                return acc;
              },
              {
                time: citiesData[0][index]?.time || 0,
                formatTime: citiesData[0][index]?.formatTime || "",
              }
            )
          )
        : [],
    [citiesData]
  );

  // Фильтрация данных по времени
  const filteredData = useMemo(
    () => filterWeatherData(mergedData, timeRange),
    [mergedData, timeRange]
  );

  // Цвета для каждой линии
  const predefinedColors = [
    "#47d6b0",
    "#a82525",
    "#25a85c",
    "#2592a8",
    "#c74410",
  ];

  const cityColors: { [key: string]: string } = {};
  selectedCities.forEach((city, index) => {
    cityColors[city] = predefinedColors[index % predefinedColors.length];
  });

  // Обработчик изменения параметра погоды
  const handleParameterChange = (value: string) => {
    setWeatherParameter(value);
  };

  return (
    <ChartWrapper>
     <ChartTop>
      <Select value={weatherParameter} onChange={handleParameterChange} />

      <Switcher onChange={setTimeRange} value={timeRange} />
      </ChartTop>

      {selectedCities.length === 0 ? (
        <p>Выберите город для отображения данных</p>
      ) : filteredData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formatTime" />
            <YAxis
              unit={
                weatherParameter === "temp"
                  ? "°C"
                  : weatherParameter === "humidity"
                  ? "%"
                  : "hPa"
              }
            />
            <Tooltip
              formatter={(value, name) => {
                if (weatherParameter === "temp") {
                  return [`${value}°C`, name];
                }
                if (weatherParameter === "humidity") {
                  return [`${value}%`, name];
                }
                return [`${value} hPa`, name];
              }}
            />
            <Legend />
            {selectedCities.map((city) => (
              <Line
                key={city}
                type="monotone"
                dataKey={city}
                stroke={cityColors[city]}
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
