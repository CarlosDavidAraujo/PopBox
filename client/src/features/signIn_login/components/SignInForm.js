import * as yup from "yup"; //biblioteca para validação de formulários
import { api } from "../../../shared/services/api";

import { Formik } from "formik"; //biblioteca para criar formularios em react, muito facil de usar, so seguir esse exemplo
import { Input } from "../../../shared/components/Input";
import { SubmitButton } from "../../../shared/components/SubmitButton";
import UserForm from "../../../shared/components/Form";
import { useFormPost } from "../../../shared/hooks/useFormPost";
import { useNavigate } from "react-router-dom";

export function SignInForm({ onToLogin }) {
  const navigate = useNavigate();
  const [error, handleSubmit] = useFormPost({
    endpoint: "/usuario/cadastro",
    onSuccess: () => navigate("/usuario"),
  });

  return (
    <UserForm>
      <UserForm.Title>Cadastro</UserForm.Title>
      <UserForm.SubTitle>
        Criar sua conta nos serviços pop Box
      </UserForm.SubTitle>
      <UserForm.Error>{error && error}</UserForm.Error>
      <Formik
        initialValues={{
          nome: "",
          email: "",
          senha: "",
        }}
        validationSchema={yup.object({
          nome: yup
            .string()
            .max(50, "Deve ter no máximo 50 caracteres")
            .required("Campo obrigatório"),
          email: yup.string().required("Campo obrigatório"),
          senha: yup.string().required("Campo obrigatório"),
        })}
        onSubmit={(values) => handleSubmit(values)}
      >
        <UserForm.Inputs>
          <Input name="nome" type="text" placeholder="Nome" />
          <Input type="text" name="email" placeholder="Email" />
          <Input type="password" name="senha" placeholder="Senha" />
          <SubmitButton type="submit">Cadastrar</SubmitButton>
          <UserForm.Link onClick={onToLogin}>ou faça login</UserForm.Link>
        </UserForm.Inputs>
      </Formik>
    </UserForm>
  );
}
