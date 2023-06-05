import { Form, Formik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { Input } from "../../../shared/components/Input";
import { SubmitButton } from "../../../shared/components/SubmitButton";
import { useDeleteUser } from "../hooks/useDeleteUser";
import UserForm from "../../../shared/components/Form";
import { useClickOutside } from "../../../shared/hooks/useClickOutside";

export function UserDeleteModal({setVisible}) {
  const ref = useClickOutside(()=> setVisible(false))
  const { isError, error, mutate } = useDeleteUser();

  return (
    <Container ref={ref}>
      <ModalTitle>Exclusão de conta</ModalTitle>
      <ModalDescription>
        Excluir sua conta é um processo irreversivel! você não terá mais acesso
        a nenhum dos seus arquivos hospedados no popBox.
      </ModalDescription>
      <UserForm.Error>{isError && error.response.data.error}</UserForm.Error>
      <Formik
        initialValues={{ senha: "", confirma_senha: "" }}
        validationSchema={yup.object({
          senha: yup.string().required("Campo obrigatório"),
          confirma_senha: yup
            .string()
            .required("Campo obrigatório")
            .oneOf([yup.ref("senha")], "As senhas não conincidem"),
        })}
        onSubmit={(values) => mutate(values)}
      >
        <Form>
          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            autoComplete="off"
          />
          <Input
            type="password"
            name="confirma_senha"
            placeholder="Confirmar senha"
            autoComplete="off"
          />
          <SubmitButton color="var(--danger)">Excluir conta</SubmitButton>
        </Form>
      </Formik>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 836px;
  height: 567px;
  border-radius: 2px;
  padding: 43px 143px 43px 43px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  background: #ffffff;
  box-shadow: 0 1px 3px 2px rgb(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  font-weight: 700;
  font-size: 45px;
`;

const ModalDescription = styled.h4`
  font-weight: 300;
  font-size: 28px;
`;
