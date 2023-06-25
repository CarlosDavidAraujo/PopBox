import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

export function Input({ ...props }) {
  return (
    <Container>
      <StyledField {...props} />
      <ErrorMessage {...props} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledField = styled(Field)`
  width: 100%;
  height: 50px;
  border: 3px solid var(--blue-1);
  border-radius: 15px;
  padding: 13px 20px;

  font-family: inherit;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  ::placeholder {
    color: var(--text-placeholder);
  }
`;
