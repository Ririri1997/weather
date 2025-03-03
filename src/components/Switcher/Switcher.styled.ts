import styled from "styled-components";

export const SwitcherContainer = styled.div`
 display: flex;
 gap: 8px;
`;

export const SwitchButton = styled.button<{ $active: boolean }>`
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 17px;
  line-height: 20.4px; 
  transition: 0.3s;
  background: ${({ $active }) => ($active ? "#E4EBFA" : "#ffffff")};
  color: "#222222";
  border: 1px solid #DAE1F0;
  
  &:hover {
    background: ${({ $active }) => ($active ? "#fff" : "#E4EBFA")};
  }
`;
