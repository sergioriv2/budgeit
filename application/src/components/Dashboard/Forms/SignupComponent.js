import { TextField } from "../../FormComponents/";
import { Formik, Form } from "formik";
import { useCallback, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import styled from "styled-components";
import * as Yup from "yup";
import axios from "axios";

import "./signup.css";
import { LoadingBackground } from "../LoadingBackground";

const Layout = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--white-1);
  white-space: nowrap;
  overflow: hidden;
  display: none;

  ${(props) => {
    if (props.showSignUp) {
      return `animation: .5s signupGoDown ease-in-out forwards;
    display: block;`;
    } else if (!props.firstTime) {
      return `;
    display: block;
      animation: .5s signupGoUp ease-in-out forwards;
      `;
    }
  }}
`;

const FormLayout = styled(Form)`
  margin: 25px 30px;
  position: relative;
  min-height: auto;

  & > div > label > label:nth-child(1) {
    color: var(--black-2);
    opacity: 0;
    transition: opacity 0.5s;
    ${(props) => {
      if (props.showSignUp) {
        return `opacity: 1;`;
      }
    }}
  }

  & > div > div > input {
    color: var(--black-1);
    opacity: 0;
    transition: opacity 0.5s;
    &:focus {
      color: var(--black-1);
    }

    ${(props) => {
      if (props.showSignUp) {
        return `opacity: 1;`;
      }
    }}
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  background-color: var(--dark-blue);
  color: var(--white-2);
  height: 35px;
  width: 35px;
  padding: 0;
  border-radius: 50%;
  font-size: 17px;
  cursor: pointer;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  transition: opacity 1s;
  transition-delay: 0.3s;
  opacity: 0;

  &:active {
    filter: brightness(80%);
  }

  ${(props) => {
    if (props.showSignUp) {
      return `opacity: 1; 
      ;
      `;
    }
  }}
`;

const RegisterButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 0;
  background-color: var(--violet-1);
  color: var(--white-2);
  margin: 5px 0;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  &:active {
    filter: brightness(90%);
  }
`;

export const SignupComponent = (props) => {
  const { showSignUp, setShowSignUp } = props;
  const [firstTime, setFirstTime] = useState(true);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const submitDataAPI = useCallback(
    (formData, resetForm) => {
      setLoading(true);
      axios({
        method: "POST",
        url: "https://budgeit-api.herokuapp.com/api/users/",
        data: {
          email: formData.email,
          password: formData.password,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setShowSignUp(false);
            resetForm();
            return Swal.fire({
              title: "Usuario registrado con éxito",
              text: "¡Inicia sesión para empezar a usar Budgeit!",
              icon: "success",
              background: "var(--dark-gray)",
              color: "var(--white-2)",
            });
          }
        })
        .catch((error) => {
          if (error.response?.data.errcode === 22) {
            return Swal.fire({
              title: "Ocurrió un error",
              text: "El email ya se encuentra registrado, intenta usando otro email.",
              icon: "error",
              background: "var(--dark-gray)",
              color: "var(--white-2)",
            });
          }

          return Swal.fire({
            title: "Ocurrió un error",
            text: "Ocurrió un error al registrarte, intentalo más tarde",
            icon: "error",
            background: "var(--dark-gray)",
            color: "var(--white-2)",
          });
        })
        .finally(() => {
          setFirstTime(false);
          setLoading(false);
        });
    },
    [setFirstTime, setShowSignUp]
  );

  const goBack = () => {
    setFirstTime(false);
    setShowSignUp(false);
  };

  return (
    <Layout showSignUp={showSignUp} firstTime={firstTime}>
      {loading ? <LoadingBackground></LoadingBackground> : null}
      <Formik
        initialValues={initialValues}
        onSubmit={(formData, { resetForm }) =>
          submitDataAPI(formData, resetForm)
        }
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Por favor, ingrese un email")
            .email("Ingrese un email válido"),
          password: Yup.string()
            .required("Por favor, ingrese una contraseña")
            .matches(
              /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
              "La contraseña debe tener al menos 1 minúscula, 1 mayúscula, 1 número, 1 caracter especial y 8 caracteres."
            ),
          passwordConfirm: Yup.string()
            .required("Por favor, ingrese una contraseña")
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas tienen que coincidir"
            ),
        })}
      >
        <FormLayout
          autoComplete="off"
          spellCheck="false"
          showSignUp={showSignUp}
        >
          <BackButton
            className="fa-solid fa-arrow-up"
            showSignUp={showSignUp}
            onClick={goBack}
            type="button"
          ></BackButton>
          <h1>Registro</h1>
          <TextField
            name="email"
            type="email"
            placeholder="Ingrese un email"
            label="Email"
            theme="login"
          />
          <TextField
            name="password"
            type="password"
            placeholder="Ingrese una contraseña"
            label="Contraseña"
            theme="login"
          />
          <TextField
            name="passwordConfirm"
            type="password"
            placeholder="Confirme la contraseña"
            label="Confirmación de la contraseña"
            theme="login"
          />
          {/* {errorMessage !== "" ? <p>{errorMessage}</p> : null} */}
          <RegisterButton type="submit">Registrarse</RegisterButton>
        </FormLayout>
      </Formik>
    </Layout>
  );
};
