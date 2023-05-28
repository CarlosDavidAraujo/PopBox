import styled from "styled-components";
import * as yup from "yup";
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

import { Input } from "../../../shared/components/Input";
import { Formik } from "formik";
import UserForm from "../../../shared/components/Form";
import { SubmitButton } from "../../../shared/components/SubmitButton";
import { api } from "../../../shared/services/api";

export function UserProfileForm() {
  const { userId } = useContext(UserContext);
  const { data, isError, isLoading, error } = useQuery({
    queryKey: "user-profile-data",
    queryFn: () => api.get(`/usuario/${userId}`),
  });

  if (isError) {
    return <h3>{error.response.data.error}</h3>;
  }

  return (
    <Container>
      <FormHeader>
        Seus dados são importantes para sua segurança no acesso aos nossos
        serviços, procure mantê-los sempre atualizados.
      </FormHeader>
      {isLoading ? (
        <h3>Carregando...</h3>
      ) : (
        <Formik
          initialValues={{
            nome: data.data.nome,
            email: data.data.email,
            nova_senha: "",
            senha: "",
          }}
          validationSchema={yup.object({
            nome: yup
              .string()
              .max(50, "Deve ter no máximo 50 caracteres")
              .required("Campo obrigatório"),
            email: yup.string().required("Campo obrigatório"),
            nove_senha: yup.string().required("Campo obrigatório"),
            senha: yup.string().required("Campo obrigatório"),
          })}
        >
          <Inputs>
            <ProfileImgInput />
            <Input value={data.data.nome} name="nome" placeholder="Nome" />
            <Input
              value={data.data.email}
              name="email"
              placeholder="Email"
              type="email"
            />
            <Input name="nova_senha" placeholder="Nova senha" type="password" />
            <Input
              name="senha"
              placeholder="Confirme sua senha atual"
              type="password"
            />
            <SubmitButton type="submit">Atualizar</SubmitButton>
            <SubmitButton color="var(--danger)">Excluir conta</SubmitButton>
          </Inputs>
        </Formik>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.h3`
  max-width: 1117px;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
`;

const ProfileImgInput = styled.div`
  width: 139px;
  height: 139px;
  border-radius: 50%;

  background: var(--bg);
`;

const Inputs = styled(UserForm.Inputs)`
  margin-top: 37px;
  align-items: flex-start;
  > div:nth-child(5) {
    margin-top: 26px;
  }
`;
