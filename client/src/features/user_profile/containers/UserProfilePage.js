import styled from "styled-components"
import { UserLayout } from "../../../shared/components/layouts/UserLayout"
import { UserProfileForm } from "../components/UserProfileForm"
import { LuFolderTree } from "react-icons/lu"
import { RiAdminLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"

export function UserProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  return (
    <UserLayout
      header={<Header>Dados cadastrais</Header>}
      sidebarContent={
        <div style={{ marginTop: "56px" }}>
          {user.administrador && (
            <MenuItem onClick={() => navigate("/admin")}>
              <RiAdminLine />
              Dahsboard
            </MenuItem>
          )}
          <MenuItem onClick={() => navigate("/usuario/pastas")}>
            <LuFolderTree />
            Meu popBox
          </MenuItem>
        </div>
      }
    >
      <UserProfileForm />
    </UserLayout>
  )
}

const Header = styled.h1`
  font-weight: 500;
  font-size: 64px;
  line-height: 77px;
  color: #ffffff;
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
