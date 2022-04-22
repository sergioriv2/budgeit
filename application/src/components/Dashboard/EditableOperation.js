import { Formik, Form } from "formik";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { TextField, Select, DateField } from "../FormComponents/";
import { CancelButton, SaveButton } from "./Forms/Buttons";

import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  & > button:nth-child(2) {
    margin-left: 15px;
  }
`;

const Layout = styled.div`
    width: 100%;
  }
`;

export const EditableOperation = (props) => {
  const context = useContext(AppContext);
  const { operation, setEditable } = props;

  const { description, amount, category, type, date, uid } = operation;
  const { refetchOperations, refetchBudget, categories } = context;

  const handleSubmit = (formData) => {
    Swal.fire({
      title: "¿Deseas guardar la edición?",
      icon: "question",
      showCancelButton: true,
      background: "var(--dark-gray)",
      color: "var(--white-2)",
      confirmButtonColor: "var(--green)",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Fetch POST
        const { date, category_uid, ...restData } = formData;
        const formattedData = {
          date: new Date(date),
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
            if (res.statusCode !== 200) {
              setEditable(false);
              refetchOperations();
              refetchBudget();

              Swal.fire(
                "Registro guardado",
                "El registro se editó correctamente.",
                "success"
              );
            }
          })
          .catch((err) => {
            Swal.fire(
              "OOPS!",
              "Ocurrió un error al guardar el registro, intentalo mas tarde.",
              "error"
            );
            console.log(err.response);
          });
      }
    });
  };

  return (
    <Layout>
      <Formik
        initialValues={{
          operation_uid: uid,
          category_uid: category.uid,
          description,
          amount,
          type: type.description,
          date: new Date(date),
        }}
        onSubmit={(formData) => handleSubmit(formData)}
        validationSchema={Yup.object({
          date: Yup.date()
            .required("Ingrese una fecha")
            .typeError("Ingrese una fecha válida"),
          description: Yup.string().required("Ingrese una descripcion"),
          amount: Yup.number()
            .required("Ingrese un monto")
            .positive("Ingrese un monto positivo")
            .typeError("Ingrese un número válido"),
        })}
      >
        <Form autoComplete="off" spellCheck="false">
          <div>
            <h3
              style={{
                fontSize: "20px",
                color: "var(--white-1)",
                marginTop: "10px",
              }}
            >
              Edición de Registro
            </h3>
            <TextField name="type" label="Tipo" disabled></TextField>
            <TextField name="description" label="Descripcion"></TextField>
            {type.uid !== 10 ? (
              <Select name="category_uid" label="Categoria">
                {categories.map(({ uid, description }) => (
                  <option key={uid} value={uid}>
                    {description}
                  </option>
                ))}
              </Select>
            ) : null}
            <TextField name="amount" label="Monto"></TextField>
            <DateField name="date" label="Fecha"></DateField>
          </div>

          <ButtonsContainer>
            <SaveButton></SaveButton>
            <CancelButton setVisible={setEditable}></CancelButton>
          </ButtonsContainer>
        </Form>
      </Formik>
    </Layout>
  );
};
