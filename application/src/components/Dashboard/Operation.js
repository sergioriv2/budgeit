import styled from "styled-components";
import { format } from "date-fns";
import { Formik, Form } from "formik";
import { useState } from "react";
import { TextField, Select } from "../FormComponents/";
import axios from "axios";

const Layout = styled.li``;

export const Operation = (props) => {
  const { operation, categories, refetch } = props;

  const { refetchOperations, refetchBudget } = refetch;
  const { description, amount, category, type, date, uid } = operation;

  const [editable, setEditable] = useState(false);

  const handleSubmit = (formData) => {
    const { date, category_uid, ...restData } = formData;
    const formattedData = {
      date: new Date(date.year, date.month - 1, date.day),
      category_uid: parseInt(formData.category_uid, 10),
      ...restData,
    };

    axios({
      method: "PUT",
      url: "http://localhost:3001/api/operations",
      data: {
        ...formattedData,
      },
      headers: {
        "x-api-key": window.localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setEditable(false);
        if (res.statusCode !== 200) {
          refetchOperations();
          refetchBudget();
        }
      })
      .catch((err) => console.log(err.response));
  };

  const handleDelete = () => {
    axios({
      method: "DELETE",
      url: "http://localhost:3001/api/operations",
      data: {
        operation_uid: uid,
      },
      headers: {
        "x-api-key": window.localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setEditable(false);
        if (res.statusCode !== 200) {
          refetchOperations();
          refetchBudget();
        }
      })
      .catch((err) => console.log(err.response));
  };

  const handleClick = (params) => {
    switch (params.target.name) {
      case "edit": {
        setEditable(true);
        return;
      }
      case "delete": {
        handleDelete();
        return;
      }
      case "cancel": {
        setEditable(false);
        return;
      }
      default:
        return;
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{
          operation_uid: uid,
          category_uid: category,
          description,
          amount,
          type,
          date: {
            day: new Date(date).getDate(),
            month: new Date(date).getMonth() + 1,
            year: new Date(date).getFullYear(),
          },
        }}
        onSubmit={(formData) => handleSubmit(formData)}
      >
        <Form>
          {!editable ? (
            <p>{description}</p>
          ) : (
            <TextField name="description" label="Descripcion"></TextField>
          )}
          {!editable ? (
            <p>{category}</p>
          ) : (
            <Select name="category_uid" label="Categoria">
              {categories.map(({ uid, description }) => (
                <option key={uid} value={uid}>
                  {description}
                </option>
              ))}
            </Select>
          )}
          {!editable ? (
            <p>{amount}</p>
          ) : (
            <TextField name="amount" label="Monto"></TextField>
          )}
          {!editable ? (
            <p>{type}</p>
          ) : (
            <TextField name="type" label="Tipo" disabled></TextField>
          )}

          {!editable ? (
            <p>Creacion: {format(new Date(date), "dd-MM-yyyy")} </p>
          ) : (
            <div>
              <TextField name="date.day" label="Dia"></TextField>
              <TextField name="date.month" label="Mes"></TextField>
              <TextField name="date.year" label="Año"></TextField>
            </div>
          )}

          {editable ? (
            <button
              name="cancel"
              onClick={(event) => handleClick(event)}
              type="button"
            >
              Cancelar
            </button>
          ) : null}
          {editable ? (
            <button name="submit" type="submit">
              Guardar
            </button>
          ) : null}
        </Form>
      </Formik>
      {!editable ? (
        <button
          name="edit"
          onClick={(event) => handleClick(event)}
          type="button"
        >
          Editar
        </button>
      ) : null}
      {!editable ? (
        <button
          name="delete"
          onClick={(event) => handleClick(event)}
          type="button"
        >
          Eliminar
        </button>
      ) : null}
    </Layout>
  );
};
