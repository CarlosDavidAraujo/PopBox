import * as yup from "yup"; //biblioteca para validação de formulários
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { Formik } from "formik"; //biblioteca para criar formularios em react, muito facil de usar, so seguir esse exemplo
import { Input } from "../../../shared/components/Input";
import { SubmitButton } from "../../../shared/components/SubmitButton";
import UserForm from "../../../shared/components/Form";
import { useAuth } from "../../../contexts/AuthContext";
import { api } from "../../../shared/services/api";

export function LoginForm({ onToSignIn }) {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation(
    (values) => api.post("/usuarios/login", values),
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
      <UserForm.Title>Fazer Login</UserForm.Title>
      <UserForm.SubTitle>Prosseguir para seu pop Box</UserForm.SubTitle>
      <UserForm.Error>{isError && error.response.data.error}</UserForm.Error>
      <Formik
        initialValues={{
          email: "",
          senha: "",
        }}
        validationSchema={yup.object({
          email: yup.string().required("Campo obrigatório"),
          senha: yup.string().required("Campo obrigatório"),
        })}
        onSubmit={(values) => mutate(values)}
      >
        <UserForm.Inputs>
          <Input type="text" name="email" placeholder="Email" />
          <Input type="password" name="senha" placeholder="Senha" />
          <SubmitButton type="submit">Entrar</SubmitButton>
          <UserForm.Link onClick={onToSignIn}>ou crie uma conta</UserForm.Link>
        </UserForm.Inputs>
      </Formik>
    </UserForm>
  );
}
