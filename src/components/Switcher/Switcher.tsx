import { memo, useCallback } from "react";
import { SwitcherContainer, SwitchButton } from "./Switcher.styled";

interface SwitcherProps {
  value: string;
  onChange: (value: string) => void;
}
const OPTIONS = [
 { label: "5 дней", value: "5d" },
 { label: "6 часов", value: "6h" },
 { label: "3 часа", value: "3h" },
];

const Switcher = ({ value, onChange }: SwitcherProps) => {
 const handleClick = useCallback((newValue: string) => {
   if (newValue !== value) {
     onChange(newValue);
   }
 }, [value, onChange]);

 return (
   <SwitcherContainer>
     {OPTIONS.map((option) => (
       <SwitchButton
         key={option.value}
         $active={value === option.value}
         onClick={() => handleClick(option.value)}
       >
         {option.label}
       </SwitchButton>
     ))}
   </SwitcherContainer>
 );
};

export default memo(Switcher);
