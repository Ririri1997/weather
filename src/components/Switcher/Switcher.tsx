import { useState } from "react";
import { SwitcherContainer, SwitchButton } from "./Switcher.styled";


const options = [
  { label: "5 дней", value: "5d" },
  { label: "1 день", value: "1d" },
  { label: "4 часа", value: "4h" },
];

export default function Switcher({ onChange }: { onChange: (value: string) => void }) {

 const [selected, setSelected] = useState("1d");

 return (
   <SwitcherContainer>
     {options.map((option) => (
       <SwitchButton
         key={option.value}
         $active={selected === option.value}
         onClick={() => {
           setSelected(option.value);
           onChange(option.value);
         }}
       >
         {option.label}
       </SwitchButton>
     ))}
   </SwitcherContainer>
 );
}