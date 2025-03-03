import styled from "styled-components";


export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const CardHeader = styled.form`
  padding: 20px;
  border-radius: 24px 24px 0px 0px;
  background: #E4EBFA;
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
`;

export const CardBody = styled.div`
  padding: 20px;
  border-radius:24px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
`;

export const Card = styled.div`
  padding: 12px 16px 12px 16px;
  border-radius: 12px;
  font-size: 17px;
  line-height: 120%;
  background: #E4EBFA;
  cursor: pointer;
  color: #222222;
  outline: none; 
  border: none;


  &:hover {
  output: none; 
  border: none;
  }
`;




