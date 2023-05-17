import { ErrorMessage, Form, Formik, Field } from "formik"; //biblioteca para criar formularios em react, muito facil de usar, so seguir esse exemplo
import * as yup from "yup"; //biblioteca para validação de formulários
import { api } from "../api";
import { Input } from "../components/Input";
import styled from "styled-components";

export function Cadastro() {
  async function handleSubmit(values) {
    await api.post("/usuario/cadastro", values);
  }

  return (
    <Container>
      <LogoSection />
      <FormSection>
        <FormHeader>
          <h1>Cadastro</h1>
          <h3>Criar sua conta nos serviços pop Box</h3>
        </FormHeader>

        <Formik
          initialValues={{
            //usem os mesmos nomes dos campos do banco de dados
            nome: "",
            email: "",
            senha: "",
          }}
          //aqui a gente vai criar um esquema de validação do formualrio usando o yup, nada de outro mundo
          validationSchema={yup.object({
            //nesse exemplo, a gente difine o tipo de dados do campo
            //e uma quantidade maxima de caracteres, e a mensagem de erro que vai exibir se ultrapassar isso, em seguida emenda com o required para validar que o campo é obrigaotrio
            nome: yup
              .string()
              .max(50, "Deve ter no máximo 50 caracteres")
              .required("Campo obrigatório"),
            email: yup.string().required("Campo obrigatório"),
            senha: yup.string().required("Campo obrigatório"),
          })}
          onSubmit={(values) => handleSubmit(values)}
        >
          <StyledForm>
            {/* Exemplo do campo nome: contem a legenda, o input (Field da biblioteca do formik) e a mensagem de erro (tambem do formik) */}
            {/* <div>
              <label htmlFor="nome">Nome*:</label>
              <Field name="nome" type="text" />
              <ErrorMessage name="nome" />
            </div> */}
            <Input name="nome" type="text" label="Nome" />
            {/* Ja aqui para facilitar utilizei um componente customizado (verificar a pasta components) 
            que criei e chamei de Input, assim a gente nao tem que ficar repetindo todas essa estrutura acima,
            sempre que precisar de um input voce podem utiliza-lo, dai ja vem todo estilizado como o paulo fez */}
            <Input label="Email" type="text" name="email" />
            <Input label="Senha" type="password" name="senha" />
            <Button type="submit">Cadastrar</Button>
          </StyledForm>
        </Formik>
      </FormSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #f6f1f1;

  //barra azul
  &:before {
    content: "";
    position: absolute;
    top: 0;
    background-color: #146c94;
    width: 100%;
    height: 50px;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 30px;

  //barra azul
  &:before {
    content: "";
    position: absolute;
    top: 0;
    background-color: #19a7ce;
    width: 100%;
    height: 50px;
  }
`;

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledForm = styled(Form)`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  background-color: #146c94;
  color: white;
  border: none;
  border-radius: 15px;
  width: max(100px, 50%);
  height: 40px;
  align-self: center;
`;
