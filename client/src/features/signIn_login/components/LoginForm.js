import * as yup from "yup"; //biblioteca para validação de formulários
import { api } from "../../../shared/services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik } from "formik"; //biblioteca para criar formularios em react, muito facil de usar, so seguir esse exemplo
import { Input } from "../../../shared/components/Input";
import { SubmitButton } from "../../../shared/components/SubmitButton";
import UserForm from "../../../shared/components/Form";
import { useFormPost } from "../../../shared/hooks/useFormPost";

export function LoginForm({ onToSignIn }) {
  const navigate = useNavigate();
  const [error, handleSubmit] = useFormPost({endpoint: '/usuario/login', onSuccess: () => navigate("/usuario")});
  
  return (
    <UserForm>
      <UserForm.Title>Fazer Login</UserForm.Title>
      <UserForm.SubTitle>Prosseguir para seu pop Box</UserForm.SubTitle>
      <UserForm.Error>{error && error}</UserForm.Error>
      <Formik
        initialValues={{
          email: "",
          senha: "",
        }}
        validationSchema={yup.object({
          email: yup.string().required("Campo obrigatório"),
          senha: yup.string().required("Campo obrigatório"),
        })}
        onSubmit={(values) => handleSubmit(values)}
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
