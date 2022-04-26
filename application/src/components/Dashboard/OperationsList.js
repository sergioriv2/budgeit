import styled from "styled-components";
import { Operation } from "./Operation";
import { NoOperation } from "./NoOperation";
import { OperationPlaceholder } from "./OperationPlaceholder";

const Layout = styled.ul`
  list-style: none;
  padding: 0;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 auto;
  }
`;

export const OperationsList = (props) => {
  const { operations, loading } = props;
  if (loading)
    return (
      <Layout>
        <OperationPlaceholder></OperationPlaceholder>
      </Layout>
    );

  return (
    <Layout>
      {!loading && operations.length === 0 ? (
        <NoOperation></NoOperation>
      ) : (
        operations.map((element) => {
          return <Operation key={element.uid} operation={element}></Operation>;
        })
      )}
    </Layout>
  );
};
