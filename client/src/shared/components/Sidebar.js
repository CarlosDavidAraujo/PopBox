import styled from "styled-components";
import { UserMenu } from "./UserMenu";
import { Logo } from "./Logo";

export function Sidebar({ children }) {
  return (
    <Container>
      <UserMenu />
      <Content>
        <Logo />
        {children}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 450px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px 0;

  > svg:nth-child(1) {
    margin: 0 auto;
  }
`;
