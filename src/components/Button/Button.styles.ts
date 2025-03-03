import styled from "styled-components";

interface ButtonProps {
 content?: "image" | "text";
}


export const Button = styled.button<ButtonProps>`
  padding: ${({content})=> content ==='image' ? '10px' : "12px 16px"} ;
  border-radius: 12px;
  font-size: 17px;
  line-height: 100%;
  background: #FFFFFF;
  cursor: pointer;
  color: #222222;
  outline: none; 
  border: none;


  &:hover {
  output: none; 
  border: none;
  }
`;



export default Button;
