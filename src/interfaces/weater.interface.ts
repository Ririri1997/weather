export interface WeatherData {
 cod: number;
 coord: Coord;
 dt: number;
 id: number;
 main: MainWeather;
 name: string;
 sys: Sys;
 timezone: number;
 visibility: number;
 weather: Weather[];
 wind: Wind;
 clouds: Clouds[];
}

interface Coord {
 lat: number;
 lon: number;
}

interface MainWeather {
 temp: number;        
 feels_like: number;  
 temp_min: number;    
 temp_max: number;    
 pressure: number;   
 humidity: number;    
 grnd_level: number;  
 sea_level: number;  
 temp_kf: number;  

}

interface Sys {
 country: string;
 id: number;
 sunrise: number;   
 sunset: number;    
 type: number;
}

interface Weather {
 description: string;
 icon: string;
 id: number;
 main: string;
}

interface Wind {
 deg: number;    
 gust: number;  
 speed: number;  
}

interface Clouds {
 all: number; 
}


export interface WeatherForecast {
 cod: string;
 message: number;
 cnt: number;
 list: WeatherForecastItem[];
 city: City;
}

interface City {
 coord: Coord;
 country: string;
 id: number;
 name: string;
 population: number;
 sunrise: number;
 sunset: number;
 timezone: number;
}


export interface WeatherForecastItem {
 dt: number;
 dt_txt: string;
 main: MainWeather;
 weather: Weather[];
 clouds: Clouds;
 wind: Wind;
 visibility: number;
 pop: number;
 sys: Sys;
}
