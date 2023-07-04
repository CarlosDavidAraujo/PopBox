import styled from "styled-components";
import { useFolders } from "../../../contexts/FolderContext";
import { useAuth } from "../../../contexts/AuthContext";

export const UserQuota = () => {
  const { user } = useAuth();
  const { getUsedQuota } = useFolders();
  const progress = (getUsedQuota() / user.cota) * 100;
  return (
    <Container>
      <QuotaBar progress={progress} />
      <QuotaValue>
        {getUsedQuota()} / {user.cota}Mb
      </QuotaValue>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 80px;
`;

const QuotaValue = styled.p`
  font-size: 32px;
  font-weight: 700;
  width: max-content;
`;

const QuotaBar = styled.div`
  position: relative;
  width: 80%;
  height: 20px;
  background-color: lightgray;
  border-radius: 5px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--blue-2);
    width: ${(props) => props.progress}%;
    height: 20px;
  }
`;
