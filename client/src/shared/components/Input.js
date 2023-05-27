import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

export function Input({...props}) {
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
  max-width: 400px;
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




/* Exemplo basico de como usar styled-components:

const MinhaDiv = styled.div`
  --estilos da div--
`;

o nome do component sempre deve inicar com letra maiuscula;
depois é so usar o MinhaDiv como uma tag html normal <MinhaDiv/> onde voce quiser; 
da pra estilizar qualquer tag ex: styled.input, styled.button e assim por diante;
styled-component é bom por que a gente nao precisa ficar criando nome de classes;
*/