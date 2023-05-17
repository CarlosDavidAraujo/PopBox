import { ErrorMessage, Form, Formik, Field } from "formik"; //biblioteca para criar formularios em react, muito facil de usar, so seguir esse exemplo
import * as yup from "yup"; //biblioteca para validação de formulários
import { api } from "../api";
import { Input } from "../components/Input";

export function Cadastro() {
  async function handleSubmit(values) {
    await api.post("/usuario/cadastro", values);
  }

  return (
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
      <Form>
        {/* Exemplo do campo nome: contem a legenda, o input (Field da biblioteca do formik) e a mensagem de erro (tambem do formik) */}
        <div>
          <label htmlFor="nome">Nome*:</label>
          <Field name="nome" type="text" />
          <ErrorMessage name="nome" />
        </div>
        {/* Ja aqui para facilitar utilizei um componente customizado (verificar a pasta components) que criei e chamei de Input, assim a gente nao tem que ficar repetindo todas essa estrutura acima */}
        <Input label="Email" type="text" name="email" />
        <Input label="Senha" type="password" name="senha" />
        <button type="submit">Enviar</button>
      </Form>
    </Formik>
  );
}
