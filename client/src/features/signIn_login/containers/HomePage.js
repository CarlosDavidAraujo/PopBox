import styled from "styled-components";
import { SignInForm } from "../components/SignInForm";
import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { Logo } from "../../../shared/components/Logo";

export function HomePage() {
  const [toSignIn, setToSignIn] = useState(false);

  return (
    <Container>
      <LeftSection>
        <Logo />
      </LeftSection>
      <RightSection>
        {toSignIn ? (
          <SignInForm onToLogin={() => setToSignIn(false)} />
        ) : (
          <LoginForm onToSignIn={() => setToSignIn(true)} />
        )}
      </RightSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: var(--header-bar-h) solid var(--blue-2);
  background-color: var(--bg);
`;

const RightSection = styled.div`
  flex: 3;
  border-top: var(--header-bar-h) solid var(--blue-1);

  > div {
    margin-top: 20vh;
  }
`;
