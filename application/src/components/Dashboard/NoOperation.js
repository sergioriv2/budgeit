import styled from "styled-components";

const Layout = styled.li`
  border: 2px solid var(--dark-gray);
  width: 100%;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 30px auto;
  min-height: 245px;
  font-size: 15px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  @media (min-width: 1024px) {
    font-size: 16px;
    border-radius: 5px;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  margin-bottom: 20px;
`;
const Text = styled.p``;
export const NoOperation = () => {
  return (
    <Layout>
      <Title>Sin resultados...</Title>
      <Text>
        <strong>TIP:</strong> Agrega un nuevo registro haciendo clic en el botón
        rosa
      </Text>
    </Layout>
  );
};
