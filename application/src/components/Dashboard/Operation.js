import styled from "styled-components";
import { format } from "date-fns";
import { useState } from "react";
import { EditableOperation } from "./EditableOperation";
import es from "date-fns/locale/es";
import { DeleteButton, EditButton } from "./Forms/Buttons";

import "sweetalert2/src/sweetalert2.scss";

const Layout = styled.li`
  background-color: var(--dark-gray);
  width: 100%;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 30px auto;
  font-size: 15px;
  transition: all 0.3s;
  min-height: 245px;
  @media (min-width: 1024px) {
    font-size: 16px;
    border-radius: 5px;
    ${(props) =>
      props.editable ? "width: 500px; margin: 30px auto;" : "width: 100%;"}
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  & > div:nth-child(2) {
    margin-left: 15px;
  }
`;

const OperationDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  height: auto;
  width: 100%;

  & > p {
    margin: 0;
  }

  @media (min-width: 1024px) {
    margin: 25px 0;
  }
`;

const DetailTitle = styled.p`
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const DetailValue = styled.p`
  max-width: 150px;
  word-wrap: break-word;
  text-align: right;
  @media (min-width: 1024px) {
    max-width: 300px;
  }
`;

const Amount = styled(DetailValue)`
  &:before {
    ${({ type }) => (type === 10 ? `content: '+ $ ';` : `content: '- $ ';`)}
  }
  font-weight: 500;
  @media (min-width: 1024px) {
    font-size: 25px;
  }
`;

const Type = styled.h2`
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 26px;
  border-bottom: 1px solid var(--light-gray);
  padding-bottom: 10px;
  @media (min-width: 1024px) {
    border-bottom: 2px solid var(--light-gray);
  }
`;

export const Operation = (props) => {
  const [editable, setEditable] = useState(false);
  const { operation } = props;

  const { description, amount, category, type, date, uid } = operation;

  return (
    <Layout editable={editable}>
      {!editable ? (
        <div>
          <Type>{type.description}</Type>
          <OperationDetail>
            <DetailTitle>Monto de la operación</DetailTitle>
            <Amount type={type.uid}>
              {amount.toLocaleString({ style: "currency", currency: "ARS" })}
            </Amount>
          </OperationDetail>
          <OperationDetail>
            <DetailTitle>Descripcion</DetailTitle>
            <DetailValue>{description}</DetailValue>
          </OperationDetail>
          {type.uid !== 10 ? (
            <OperationDetail>
              <DetailTitle>Categoria</DetailTitle>
              <DetailValue>{category.description}</DetailValue>
            </OperationDetail>
          ) : null}
          <OperationDetail>
            <p>
              {format(new Date(date), "dd 'de' MMMM yyyy", {
                locale: es,
              })}
            </p>
          </OperationDetail>
          <ButtonsContainer>
            <EditButton setEditable={setEditable}></EditButton>
            <DeleteButton uid={uid} setEditable={setEditable}></DeleteButton>
          </ButtonsContainer>
        </div>
      ) : (
        <EditableOperation
          operation={operation}
          setEditable={setEditable}
        ></EditableOperation>
      )}
    </Layout>
  );
};
