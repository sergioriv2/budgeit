import styled from "styled-components";
import axios from "axios";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import { Formik, Form } from "formik";
import { TextField, Select } from "../components/FormComponents";
import { Operation } from "../components/Dashboard/Operation";
import useFetchGetData from "../hooks/useFetchGetData";
import { useEffect, useState, useCallback } from "react";

const Layout = styled.section``;

const Button = styled.button``;

export const Dashboard = () => {
  const { data: budget, refetch: refetchBudget } = useFetchGetData(
    "http://localhost:3001/api/users/budget"
  );
  const { data: operations, refetch: refetchOperations } = useFetchGetData(
    "http://localhost:3001/api/operations"
  );

  const { data: categories } = useFetchGetData(
    "http://localhost:3001/api/categories"
  );

  const [sortedOperations, setSortedOperations] = useState([]);

  const __sortOperations = useCallback(() => {
    if (operations.length === 0) return;
    var list = {};

    for (let i = 0; i < operations.length; i++) {
      let mes = format(new Date(operations[i].date), "MMMM", { locale: es });
      if (!list[mes]) {
        list[mes] = [];
      }

      list[mes].push({ ...operations[i] });
    }

    setSortedOperations([list]);
  }, [operations]);

  useEffect(() => {
    __sortOperations();
  }, [__sortOperations]);

  // const sortedOperations = operations.reduce((acc, operation) => {}, )

  const handleSubmit = (formData) => {
    const { date, category_uid, ...restData } = formData;

    const formattedData = {
      date: new Date(date.year, date.month - 1, date.day),
      category_uid: parseInt(category_uid, 10),
      ...restData,
    };

    axios({
      method: "POST",
      url: "http://localhost:3001/api/operations",
      data: {
        ...formattedData,
      },
      headers: {
        "x-api-key": window.localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          refetchBudget();
          refetchOperations();
        }
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <Layout>
      <p> Balance:{budget.total_budget}</p>
      <Button>Add</Button>
      <ul>
        {operations.map((element) => (
          <Operation
            key={element.uid}
            refetch={{ refetchBudget, refetchOperations }}
            operation={element}
          ></Operation>
        ))}
      </ul>
      <Formik
        initialValues={{
          category_uid: "",
          amount: "",
          type_uid: 10,
          date: {
            day: "",
            month: "",
            year: "",
          },
          description: "",
        }}
        onSubmit={(formData) => handleSubmit(formData)}
      >
        <Form>
          <TextField name="description" label="Descripcion"></TextField>
          <Select name="type_uid" label="Tipo">
            <option value={10}>Ingreso</option>
            <option value={11}>Egreso</option>
          </Select>
          <Select name="category_uid" label="Categoria">
            {categories.map(({ uid, description }) => (
              <option key={uid} value={uid}>
                {description}
              </option>
            ))}
          </Select>
          <TextField name="amount" label="Cantidad"></TextField>
          <p>Fecha</p>
          <TextField name="date.day" label="Dia"></TextField>
          <TextField name="date.month" label="Mes"></TextField>
          <TextField name="date.year" label="Año"></TextField>
          <input type="submit"></input>
        </Form>
      </Formik>
    </Layout>
  );
};
