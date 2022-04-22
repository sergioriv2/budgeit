import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useFormikContext } from "formik";
import { Select } from "../../FormComponents";

import styled from "styled-components";

const Layout = styled.div`
  max-width: 300px;
  @media (min-width: 1024px) {
    width: 800px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

export const CategorySelect = ({ categories, setEndpoint }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    const handleSubmit = () => {
      if (values.filter === "0")
        setEndpoint("http://localhost:3001/api/operations");
      else
        setEndpoint(
          "http://localhost:3001/api/operations/filter/category/" +
            values.filter
        );
    };

    handleSubmit();
  }, [values, setEndpoint]);

  return (
    <Select name="filter" label="Filtrar por categoría" theme="filter">
      <option value="0">Todos</option>
      {categories.map((element) => (
        <option key={element.uid} value={element.uid}>
          {element.description}
        </option>
      ))}
    </Select>
  );
};

export const CategoryFilter = ({ categories, setEndpoint }) => {
  return (
    <Layout>
      <Formik initialValues={{ filter: "0" }}>
        <Form>
          <Container>
            <CategorySelect
              categories={categories}
              setEndpoint={setEndpoint}
            ></CategorySelect>
          </Container>
        </Form>
      </Formik>
    </Layout>
  );
};
