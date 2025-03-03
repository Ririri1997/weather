import styled from "styled-components";


interface ImageProps {
 size?: "small" | "large";
}

export const ImageStyled = styled.img<ImageProps>`
 width: ${({ size }) =>
   size === "small"
     ? "44px"
     : size === "large"
     ? "100px"
     : "64px"};
 margin: auto;
`;