import styled from "styled-components"
import { Modal } from "../../../shared/components/modals/Modal"
import { Button } from "../../../shared/components/buttons/Button"
import { useCreateUserMutation } from "../hooks/useCreateUserMutation"
import UserForm from "../../../shared/components/Form"
import { Form, Formik } from "formik"
import * as yup from "yup"
import { Input } from "../../../shared/components/Input"

export const AddUserModal = ({ isOpen, onClose }) => {
  const { mutate, isError, error } = useCreateUserMutation()

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Modal isOpen={isOpen}>
      <Formik
        initialValues={{
          nome: "",
          email: "",
          senha: "",
          cota: "",
        }}
        validationSchema={yup.object({
          nome: yup
            .string()
            .max(50, "Deve ter no máximo 50 caracteres")
            .required("Campo obrigatório"),
          email: yup.string().required("Campo obrigatório"),
          senha: yup.string().required("Campo obrigatório"),
          cota: yup
            .number()
            .min(0, "O valor mínimo é 100")
            .max(1000, "O valor máximo é 1000")
            .required("Campo obrigatório"),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <ModalContent>
            <ModalHeader>Adicionar usuario</ModalHeader>
            <UserForm.Error>{isError && error.response.data}</UserForm.Error>
            <ModalBody>
              <Input name="nome" type="text" placeholder="Nome" />
              <Input type="text" name="email" placeholder="Email" />
              <Input type="password" name="senha" placeholder="Senha" />
              <Input type="number" name="cota" placeholder="Cota" />
            </ModalBody>
            <ModalFooter>
              <Button variant="text" color="var(--blue-2)" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="outlined" color="var(--blue-2)">
                Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  )
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  padding: 20px 40px;
  border-radius: 10px;
  background-color: white;
`

const ModalHeader = styled.p`
  font-size: 24px;
`

const ModalBody = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`
