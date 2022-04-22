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
  width: 420px;
  margin: 0 10px;
  height: 500px;
  background-color: var(--black);
  position: relative;
  box-shadow: 0px 3px 10px 2px rgba(0, 0, 0, 0.3);
  border-top: 8px solid var(--dark-blue);

  & > form {
    display: flex;
    flex-direction: column;
    padding: 30px 35px;

    & > img {
      position: absolute;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      top: -65px;
      left: 50%;
      z-index: 5;
      transform: translateX(-50%);
    }

    & > h1 {
      text-align: center;
      font-size: 25px;
      margin-top: 15px;
      margin-bottom: 5px;
      color: var(--white-1);
    }

    & > button {
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
    }
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
        console.log(error.response);
        setErrorMessage(error.response.data.msg);
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
          <img src={Icon} alt="budgeit-icon"></img>
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
          {errorMessage !== "" ? <p>{errorMessage}</p> : null}
          <button type="submit" className="fa-solid fa-arrow-right"></button>
        </Form>
      </Formik>
      <SignupComponent
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
      ></SignupComponent>
    </Layout>
  );
};
