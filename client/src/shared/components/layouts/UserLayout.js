import styled from "styled-components";
import { Sidebar } from "../Sidebar";

export function UserLayout({ sidebarContent, header, children }) {
  return (
    <Container>
      <Sidebar>{sidebarContent}</Sidebar>
      <Content>
        <RightBar>{header}</RightBar>
        <div style={{ padding: "44px" }}>{children}</div>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100vw;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RightBar = styled.div`
  width: 100%;
  height: var(--header-bar-h);
  padding: 0 43px;
  display: flex;
  align-items: center;
  background-color: var(--blue-1);
`;
