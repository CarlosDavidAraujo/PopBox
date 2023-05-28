import styled from "styled-components";

export const SubmitButton = styled.button`
  padding: 16px;
  border-radius: 20px;
  background-color: ${(props) => (props.color ? props.color : "var(--blue-2)")};
  color: white;
  border: none;
  cursor: pointer;

  font-family: "Urbanist";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;
