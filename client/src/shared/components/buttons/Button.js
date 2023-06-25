import styled, { css } from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  color: ${(props) => (props.textColor ? props.textColor : "black")};
  font-family: inherit;
  font-size: 18px;
  cursor: pointer;
  ${({ variant }) =>
    variant == "outlined" &&
    css`
      background-color: transparent;
      border: 2px solid ${(props) => props.color};
      color: ${(props) => props.color};
    `}
  ${({ variant }) =>
    variant == "text" &&
    css`
      padding: 0;
      background-color: transparent;
      color: ${(props) => props.color};
    `}
`;
