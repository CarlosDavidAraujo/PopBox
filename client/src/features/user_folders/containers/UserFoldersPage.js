import styled from "styled-components";
import { Logo } from "../../../shared/components/Logo";
import { UserMenu } from "../components/UserMenu";
import { UserFolderList } from "../components/UserFolderList";
import { FooterMenu } from "../components/FooterMenu";

export function UserFoldersPage() {
  return (
    <Container>
      <LeftSection>
        <UserMenu/>
        <Logo/>
      </LeftSection>
      <RightSection>
        <UserFolderList/>
        <FooterMenu/>
      </RightSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--bg);
  > svg {
    margin: 85px 90px;
  }
`;

const RightSection = styled.div`
  flex: 4;
  border-top: var(--header-bar-h) solid var(--blue-1);
  padding: 90px 77px;
  position: relative;
`;
