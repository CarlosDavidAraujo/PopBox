import styled from "styled-components"
import { AdminProvider } from "../../contexts/AdminContext"
import { UserLayout } from "../../shared/components/layouts/UserLayout"
import { UsersList } from "./components/UsersList"
import { LuFolderTree } from "react-icons/lu"
import { RiAdminLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { useToggle } from "../../shared/hooks/useToggle"
import { AddUserModal } from "./components/AddUserModal"
import { Button } from "../../shared/components/buttons/Button"

export const AdminPage = () => {
  const navigate = useNavigate()
  const { state, setOff, setOn } = useToggle()
  return (
    <AdminProvider>
      <UserLayout
        sidebarContent={
          <div style={{ marginTop: "56px" }}>
            <MenuItem onClick={() => navigate("/admin")}>
              <RiAdminLine />
              Dahsboard
            </MenuItem>
            <MenuItem onClick={() => navigate("/usuario/pastas")}>
              <LuFolderTree />
              Meu popBox
            </MenuItem>
          </div>
        }
      >
        <PageContent>
          <Button variant="outlined" color="var(--blue-2)" onClick={setOn}>
            Adicionar usuario
          </Button>
          <UsersList />
          <AddUserModal isOpen={state} onClose={setOff} />
        </PageContent>
      </UserLayout>
    </AdminProvider>
  )
}

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`

const MenuItem = styled.button`
  width: 100%;
  height: 64px;
  border-radius: 0px 30px 30px 0px;
  padding: 9px 27px;
  border: none;
  display: flex;
  align-items: center;
  gap: 26px;
  cursor: pointer;

  background-color: var(--bg);

  font-family: inherit;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--blue-2);
    color: var(--bg);
  }
`
