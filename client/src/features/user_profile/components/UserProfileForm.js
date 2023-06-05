import styled from "styled-components";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";

import { useAuth } from "../../../contexts/AuthContext";
import { useMutation } from "react-query";
import { api } from "../../../shared/services/api";

import { Input } from "../../../shared/components/Input";
import UserForm from "../../../shared/components/Form";
import { SubmitButton } from "../../../shared/components/SubmitButton";
import { UserDeleteModal } from "./UserDeleteModal";


export function UserProfileForm() {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, setUser } = useAuth();
  const { mutate, isError, error, isSuccess } = useMutation(
    (values) => api.put("/usuario/update", values),
    {
      onSuccess: (data) => {
        setUser(data.data.user);
      },
    }
  );

  return (
    <Container>
      <FormHeader>
        {isSuccess
          ? "Seus dados foram atualizados com sucesso!"
          : "Seus dados são importantes para sua segurança no acesso aos nossos serviços, procure mantê-los sempre atualizados."}
      </FormHeader>
      <Formik
        initialValues={{
          id: user.id,
          nome: user.nome,
          email: user.email,
          nova_senha: "",
          senha: "",
        }}
        validationSchema={yup.object({
          id: yup.number(),
          nome: yup
            .string()
            .max(50, "Deve ter no máximo 50 caracteres")
            .required("Campo obrigatório"),
          email: yup.string().required("Campo obrigatório"),
          nova_senha: yup.string().min(6, "Requer no mínimo 6 caracteres"),
          senha: yup.string().required("Campo obrigatório"),
        })}
        onSubmit={(values) => mutate(values)}
      >
        <Inputs>
          <ProfileImgInput />
          <UserForm.Error>
            {isError && error.response.data.error}
          </UserForm.Error>
          <input type="hidden" name="id" />
          <Input name="nome" placeholder="Nome" />
          <Input name="email" placeholder="Email" type="email" />
          <Input
            name="nova_senha"
            placeholder="Nova senha"
            type="password"
            autoComplete="off"
          />
          <Input
            name="senha"
            placeholder="Confirme sua senha atual"
            type="password"
            autoComplete="off"
          />
          <SubmitButton type="submit">Atualizar</SubmitButton>
          <SubmitButton color="var(--danger)" onClick={()=> setModalVisible(true)}>Excluir conta</SubmitButton>
        </Inputs>
      </Formik>
      {modalVisible && <UserDeleteModal setVisible={setModalVisible}/>}
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
  > div:nth-child(7) {
    margin-top: 26px;
  }
`;
