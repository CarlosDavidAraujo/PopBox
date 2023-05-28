import styled from "styled-components";
import { UserLayout } from "../../../shared/components/layouts/UserLayout";
import { UserProfileForm } from "../components/UserProfileForm";

export function UserProfilePage() {
  return (
    <UserLayout header={<Header>Dados cadastrais</Header>}>
      <UserProfileForm />
    </UserLayout>
  );
}

const Header = styled.h1`
  font-weight: 500;
  font-size: 64px;
  line-height: 77px;
  color: #ffffff;
`;
