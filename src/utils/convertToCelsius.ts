export default function convertToCelsius(tempKelvin: number) {
 const tempCelsius = Math.round(tempKelvin - 273.15);
 return tempCelsius;
}
