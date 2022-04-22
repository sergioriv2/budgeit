import { LoginComponent } from "../components/Dashboard/Forms/LoginComponent";
import styled from "styled-components";

const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1f1f1f;
`;

export const Login = () => {
  return (
    <Layout>
      <LoginComponent />
    </Layout>
  );
};
