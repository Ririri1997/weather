import styled from "styled-components";

interface TextProps {
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large"; 
  $textAlign?: "center" | "left"; 
}

export const Text = styled.p<TextProps>`
  font-family: Philosopher;
  font-weight: 400;
  text-align: ${({ $textAlign }) =>
   $textAlign === "center"
      ? "center"
      : "left"}; 

  font-size: ${({ size }) =>
    size === "small"
      ? "17px"
      : size === "large"
      ? "90px"
      : "28px"}; 

  line-height: ${({ size }) =>
    size === "small"
      ? "20.4px"
      : size === "large"
      ? "72px"
      : "33.6px"};

  color: ${({ color }) => 
    color === "secondary" ? "#808080" : "#222222"};

`;
export default Text;