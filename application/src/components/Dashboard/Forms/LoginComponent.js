import { TextField } from "../../FormComponents/";
import { Formik, Form } from "formik";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import axios from "axios";
import styled from "styled-components";
import Icon from "../../../assets/icon.png";
import { SignupComponent } from "./SignupComponent";

const Layout = styled.div`
  width: 400px;
  margin: 0 10px;
  min-height: 520px;
  background-color: var(--black);
  position: relative;
  box-shadow: 0px 3px 10px 2px rgba(0, 0, 0, 0.3);
  border-top: 8px solid var(--dark-blue);

  & > form {
    display: flex;
    flex-direction: column;
    padding: 30px 35px;

    & > h1 {
      text-align: center;
      font-size: 25px;
      margin-top: 15px;
      margin-bottom: 5px;
      color: var(--white-1);
    }
  }
`;

const AppImage = styled.img`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  top: -65px;
  left: 50%;
  z-index: 5;
  transform: translateX(-50%);
`;

const LoginButton = styled.button`
  position: absolute;
  bottom: -30px;
  border: 0;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  background-color: var(--white-1);
  color: var(--black);
  font-size: 25px;
  width: 60px;
  height: 60px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 3px 10px 2px rgba(0, 0, 0, 0.3);
  border: 2px solid var(--white-1);
  transition: all 0.2s;

  &: hover {
    background-color: var(--black);
    color: var(--white-1);
  }

  &:active {
    width: 58px;
    filter: brightness(90%);
    height: 58px;
  }
`;

const LabelSignup = styled.label`
  color: var(--white-1);
  font-size: 14px;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  margin-top: 5%;
`;

const ErrorMessage = styled.p`
  color: var(--dark-gray-2);
  font-weight: 500;
  margin: 10px 0;
`;

export const LoginComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const navigate = useNavigate();

  const submitDataAPI = useCallback((formData) => {
    axios({
      method: "POST",
      url: "http://localhost:3001/api/users/signin",
      data: {
        email: formData.email,
        password: formData.password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
          window.localStorage.setItem("token", response.data.token);
        }
        setErrorMessage(response.data.msg);
      })
      .catch((error) => {
        if (error.response.data.errcode === 20) {
          setErrorMessage(
            "Contraseña o email incorrecto, inténtelo nuevamente."
          );
        }
      });
  }, []);

  useEffect(() => {
    if (loggedIn || window.localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [loggedIn, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={(formData) => submitDataAPI(formData)}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Por favor, ingrese un email")
            .email("Ingrese un email válido"),
          password: Yup.string().required("Por favor, ingrese una contraseña"),
        })}
      >
        <Form autoComplete="off" spellCheck="false">
          <AppImage src={Icon} alt="budgeit-icon"></AppImage>
          <h1>Inicio de sesión</h1>
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
          <LabelSignup onClick={() => setShowSignUp(true)}>
            Crear nuevo usuario
          </LabelSignup>
          {errorMessage !== "" ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : null}
          <LoginButton
            type="submit"
            className="fa-solid fa-arrow-right"
          ></LoginButton>
        </Form>
      </Formik>
      <SignupComponent
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
      ></SignupComponent>
    </Layout>
  );
};
