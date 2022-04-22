import { Formik, Form, useFormikContext } from "formik";
import { TextField, Select, DateField } from "../../FormComponents";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";
import styled from "styled-components";
import axios from "axios";
import { AddButton, SaveButton } from "./Buttons";

import "react-responsive-modal/styles.css";
import "./custom-modal.css";

const Layout = styled.div`
  & > div
    background-color: red;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  & > button:nth-child(2) {
    margin-left: 15px;
  }
`;

export const SelectCategory = ({ categories }) => {
  const { values } = useFormikContext();

  return (
    <div>
      {values.type_uid !== "10" ? (
        <Select name="category_uid" label="Categoria">
          {categories.map(({ uid, description }) => (
            <option key={uid} value={uid}>
              {description}
            </option>
          ))}
        </Select>
      ) : null}
    </div>
  );
};

export const AddOperation = () => {
  const context = useContext(AppContext);
  const { refetchBudget, refetchOperations, categories } = context;
  const [formVisible, setFormVisible] = useState(false);

  const handleSubmit = (formData, resetForm) => {
    const { date, category_uid, type_uid, ...restData } = formData;

    Swal.fire({
      title: "¿Deseas guardar el registro?",
      icon: "question",
      showCancelButton: true,
      background: "var(--dark-gray)",
      color: "var(--white-2)",
      confirmButtonColor: "var(--green)",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const formattedData = {
          date: new Date(date),
          // Let the income's category to 'other'
          category_uid: type_uid === "10" ? 16 : parseInt(category_uid, 10),
          type_uid: parseInt(type_uid, 10),
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
              Swal.fire(
                "Registro guardado",
                "El registro se guardó correctamente.",
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
          })
          .finally(() => {
            resetForm();
            setFormVisible(false);
          });
      }
    });
  };

  return (
    <Layout>
      <Modal
        center
        closeOnEsc={true}
        closeOnOverlayClick={true}
        open={formVisible}
        onClose={() => setFormVisible(false)}
        closeIconId={"closeIcon"}
        classNames={{
          modal: "customModal",
        }}
      >
        <Formik
          initialValues={{
            category_uid: "",
            amount: "",
            type_uid: "10",
            date: new Date(),
            description: "",
          }}
          onSubmit={(formData, { resetForm }) =>
            handleSubmit(formData, resetForm)
          }
          validationSchema={Yup.object({
            description: Yup.string()
              .required("Ingrese una descripción")
              .max(50, "Máximo 50 caracteres"),
            amount: Yup.number()
              .required("Ingrese un monto")
              .positive("Ingrese un monto positivo")
              .typeError("Ingrese un número válido"),
            date: Yup.date()
              .required("Ingrese una fecha")
              .typeError("Ingrese una fecha válida"),
          })}
        >
          <Form autoComplete="off" spellCheck="false">
            <h3 style={{ fontSize: "20px", color: "var(--white-1)" }}>
              Nuevo Registro
            </h3>
            <TextField name="description" label="Descripcion"></TextField>
            <Select name="type_uid" label="Tipo">
              <option value={10}>Ingreso</option>
              <option value={11}>Egreso</option>
            </Select>
            <SelectCategory categories={categories}></SelectCategory>
            <TextField name="amount" label="Cantidad"></TextField>
            <DateField label="Fecha" name="date"></DateField>
            <ButtonsContainer>
              {/* <CancelButton setVisible={setFormVisible}></CancelButton> */}
              <SaveButton></SaveButton>
            </ButtonsContainer>
          </Form>
        </Formik>
      </Modal>

      <AddButton setFormVisible={setFormVisible}></AddButton>
    </Layout>
  );
};
