import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

export function Input({ label, name, type }) {
  return (
    <div>
      <StyledField name={name} type={type} placeholder={label} />
      <ErrorMessage name={name} />
    </div>
  );
}

const StyledField = styled(Field)` 
  width: 100%;
  border: 2px solid #19a7ce;
  border-radius: 10px;
  padding: 7px;
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