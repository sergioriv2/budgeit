import styled from "styled-components";

import useFetchGetData from "../hooks/useFetchGetData";
import { OperationsList } from "../components/Dashboard/OperationsList";
import { AddOperation } from "../components/Dashboard/Forms/AddOperation";
import { AppContext } from "../context/AppContext";
import { CategoryFilter } from "../components/Dashboard/Forms/CategoryFilter";
import { SignOut } from "../components/Dashboard/Forms/Buttons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Budget } from "../components/Dashboard/Budget";
import useLocalStorage from "../hooks/useLocalStorage";

const Layout = styled.div`
  background-color: var(--dark-blue);
  height: 100vh;
  font-family: var(--paragraph-font);
  font-weight: 300;
`;

const Section = styled.section`
  background-color: var(--black);
  color: var(--white-1);
  min-height: 87vh;
  transition: border-top-left-radius 1s, border-top-right-radius 1s;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  @media (min-width: 1024px) {
    transition: border-top-left-radius 1s, border-top-right-radius 1s;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    min-height: 94vh;
    background-color: var(--black);
  }
`;

const Header = styled.header`
  padding: 40px 30px;

  color: var(--white-1);
  & > h1 {
    font-size: 35px;
    text-transform: uppercase;
    font-family: var(--title-font-1);
  }

  @media (min-width: 1024px) {
    padding: 20px 30px;
    & > h1 {
      font-size: 25px;
    }
  }
`;

const SectionHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 120px;
  position: sticky;
  top: 0;
  background-color: var(--black);
  color: var(--white-1);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  z-index: 10;
  transition: border-top-left-radius 1s, border-top-right-radius 1s;

  @media (min-width: 1024px) {
    transition: border-top-left-radius 1s, border-top-right-radius 1s;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    height: 160px;
  }
`;

const SectionContent = styled.div`
  padding: 15px 20px;
  position: relative;
  & > input {
    position: fixed;
    bottom: 0;
  }
  @media (min-width: 768px) {
    padding: 0;
  }
`;

export const Dashboard = () => {
  const navigate = useNavigate();
  const [token, , removeToken] = useLocalStorage("token");

  const {
    data: budget,
    refetch: refetchBudget,
    loading: loadingBudget,
  } = useFetchGetData("http://localhost:3001/api/users/budget");

  const {
    data: operations,
    loading: operationsLoad,
    refetch: refetchOperations,
    setEndpoint,
  } = useFetchGetData("http://localhost:3001/api/operations");

  const { data: categories } = useFetchGetData(
    "http://localhost:3001/api/categories"
  );

  useEffect(() => {
    if (!token) {
      navigate("../");
    }
  }, [token, navigate]);

  return (
    <AppContext.Provider
      value={{
        refetchBudget,
        refetchOperations,
        categories,
        removeToken,
      }}
    >
      <Layout>
        <Header>
          <h1>Budge.it</h1>
        </Header>
        <Section>
          <SectionHeader>
            <Budget budget={budget} loading={loadingBudget}></Budget>
            <CategoryFilter
              setEndpoint={setEndpoint}
              categories={categories}
            ></CategoryFilter>
          </SectionHeader>
          <SectionContent>
            <OperationsList
              operations={operations}
              loading={operationsLoad}
            ></OperationsList>
            <AddOperation></AddOperation>
            <SignOut></SignOut>
          </SectionContent>
        </Section>
      </Layout>
    </AppContext.Provider>
  );
};
