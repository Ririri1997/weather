export default interface WeatherData {
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
