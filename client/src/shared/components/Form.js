import { Form } from "formik";
import styled from "styled-components";

const Title = styled.h1`
  font-weight: 500;
  font-size: 64px;
  line-height: 77px;
`;

const SubTitle = styled.h3`
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
`;

const Error = styled.h5`
  margin: 15px 0 5px 0;
  height: 20px;
`;

const Inputs = styled(Form)`
  gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 200px;
  }

  input {
    width: 400px;
  }
`;

const Link = styled.a`
  font-family: "Urbanist";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  text-decoration-line: underline;
  color: var(--blue-2);
  cursor: pointer;
`;

const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

UserForm.Title = Title;
UserForm.SubTitle = SubTitle;
UserForm.Error = Error;
UserForm.Inputs = Inputs;
UserForm.Link = Link;

export default UserForm;
