import styled from "styled-components";

export const CardsWrapper = styled.div`
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 gap: 16px;
`;

export const CardHeader = styled.form`
 padding: 20px;
 border-radius: 24px 24px 0px 0px;
 background: #e4ebfa;
 display: grid;
 grid-template-columns: auto 44px;
 grid-template-rows: 44px;
 gap: 10px;
`;

interface CardBodyProps {
 $hasData?: boolean;
}

export const CardBody = styled.div<CardBodyProps>`
 min-height: 210px;
 padding: 20px;
 border-radius: 0px 0px 24px 24px;
 background: #ffffff;
 display: grid;
 gap: ${({ $hasData }) =>
  $hasData ? "16px" : "0px"};
 align-items: center;
 grid-template-columns: ${({ $hasData }) =>
  $hasData? "repeat(6, 1fr)" : "repeat(1, 1fr)"};
 grid-template-areas: ${({ $hasData }) =>
  $hasData
   ? `"one one one two two two"
      "three three four four five five"`
   : `"one"
      "two"`};
`;

export const Card = styled.div`
 padding: 12px 16px 12px 16px;
 border-radius: 12px;
 font-size: 17px;
 line-height: 120%;
 background: #e4ebfa;
 cursor: pointer;
 color: #222222;
 outline: none;
 border: none;

 &:hover {
  output: none;
  border: none;
 }
`;
