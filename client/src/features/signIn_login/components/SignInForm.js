import * as yup from "yup"; //biblioteca para validação de formulários
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { api } from "../../../shared/services/api";
import { useMutation } from "react-query";

import { Formik } from "formik"; //biblioteca para criar formularios em react, muito facil de usar, so seguir esse exemplo
import { Input } from "../../../shared/components/Input";
import { SubmitButton } from "../../../shared/components/SubmitButton";
import UserForm from "../../../shared/components/Form";

export function SignInForm({ onToLogin }) {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation(
    (values) => api.post("/usuario/cadastro", values),
    {
      onSuccess: (data) => {
        setToken(data.data.token);
        setUser(data.data.user);
        navigate("/usuario/pastas");
      },
    }
  );

  return (
    <UserForm>
      <UserForm.Title>Cadastro</UserForm.Title>
      <UserForm.SubTitle>
        Criar sua conta nos serviços pop Box
      </UserForm.SubTitle>
      <UserForm.Error>{isError && error.response.data.error}</UserForm.Error>
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
        onSubmit={(values) => mutate(values)}
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
