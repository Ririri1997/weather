import { SelectButton } from "./Select.styled";


interface SelectProps {
 value: string;
 onChange: (value: string) => void;
}

const Select = ({ value, onChange }: SelectProps) => {
 return (
     <SelectButton
       id="weatherParameter"
       value={value}
       onChange={(e) => onChange(e.target.value)} // Обработчик события onChange
     >
       <option value="temp">Температура</option>
       <option value="humidity">Влажность</option>
       <option value="pressure">Давление</option>
     </SelectButton>
 );
};

export default Select;
