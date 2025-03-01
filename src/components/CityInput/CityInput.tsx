import { useState } from "react";

interface CityInputProps {
 onChange: (city: string) => void;
}

export default function CityInput({ onChange }: CityInputProps){
 const[city, setСity] = useState<string>("");
 
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setСity(e.target.value);
};

function save(e: React.FormEvent){
 e.preventDefault();
 onChange(city)
}

return(
 <form onSubmit={save}>
 <input value={city} onChange={handleChange} type="text"/>
 <button type='submit'>Отправить</button>
 </form>

)
}