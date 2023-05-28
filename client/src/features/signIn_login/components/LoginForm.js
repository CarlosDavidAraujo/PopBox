import * as yup from "yup"; //biblioteca para validação de formulários
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useMutation } from "react-query";

import { Formik } from "formik"; //biblioteca para criar formularios em react, muito facil de usar, so seguir esse exemplo
import { Input } from "../../../shared/components/Input";
import { SubmitButton } from "../../../shared/components/SubmitButton";
import UserForm from "../../../shared/components/Form";
import { UserContext } from "../../../contexts/UserContext";
import { api } from "../../../shared/services/api";

export function LoginForm({ onToSignIn }) {
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation(
    (values) => api.post("/usuario/login", values),
    {
      onSuccess: (data) => {
        setUserId(data.data.user_id);
        navigate("/usuario");
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
