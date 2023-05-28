import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function UserMenu() {
  const navigate = useNavigate();
  return (
    <Container>
      <UserPortrait onClick={()=> navigate('/usuario/perfil')}/>
      <div>
        <UserName>Usuario pop</UserName>
        <LogoutButton onClick={()=> navigate('/')}>sair</LogoutButton>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: var(--header-bar-h);
  padding: 20px 24px;
  gap: 18px;
  display: flex;
  align-items: center;

  background-color: var(--blue-2);

  > div:nth-child(2) { //seleciona o segundo filho direto que seja uma div
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

const UserPortrait = styled.a`
  width: 67px;
  height: 67px;
  aspect-ratio: 1;
  border-radius: 50%;
  cursor: pointer;

  background-color: var(--bg);
`;

const UserName = styled.h4`
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
`;

const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  text-decoration-line: underline;
  color: #00c8ff;
`;
