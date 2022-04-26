import { useField } from "formik";

import styled from "styled-components";
import { useState } from "react";
import { TogglePassword } from "./TogglePassword";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  justify-content: center;
  margin: 20px 0;
`;

const Title = styled.label`
  font-weight: 500;
  font-size: 14px;
  color: var(--white-1);
  font-family: var(--title-font-2);
  text-transform: uppercase;
`;

const LabelContainer = styled.label`
  margin: 5px 0;
`;

const Input = styled.input`
  border: none;
  outline: 0;
  font-family: inherit;
  width: 100%;

  ${(props) => {
    switch (props.theme) {
      case "login":
        return `background-color: inherit;
      border-bottom: ${
        !props.hasErrors
          ? "1px solid var(--light-gray);"
          : "1px solid var(--red);"
      };
      border-radius: 0;
      padding: 15px 0;
      color: var(--dark-gray-2);
      transition: all 0.1s;
      font-size: 16px;
      &:focus {
        color: var(--white-1);
        border-bottom: 2px solid var(--light-gray)
      }`;
      default:
        return `
        font-weight: 500;
      &:focus {
        border: 2px solid #3096db;
      }
      border: none;
      padding: 12px 10px 12px 15px;
      border-radius: 5px;
      background-color: #2f2f2f;
      transition: all 0.1s;
      color: ${!props.disabled ? "var(--white-1);" : "#e4e4e454;"}
      `;
    }
  }}
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const ErrorMessage = styled.p`
  color: var(--red);
  font-size: 15px;
  margin: 0;
  margin-top: 10px;
  white-space: break-spaces;
`;

const Important = styled.label`
  color: var(--red);
  font-weight: 700;
  margin-left: 10px;
`;

const InputField = ({
  label,
  type = "text",
  min,
  max,
  disabled = false,
  theme = "default",
  placeholder = "",
  ...props
}) => {
  const [field, meta] = useField(props);
  const [inputType, setInputType] = useState(type);
  const hasErrors = meta.touched && meta.error;

  return (
    <Layout>
      <LabelContainer>
        <Title>{label}</Title>
        {hasErrors ? <Important>*</Important> : null}
      </LabelContainer>
      <InputContainer>
        <Input
          placeholder={placeholder}
          meta={meta}
          {...field}
          disabled={disabled}
          type={inputType}
          min={min}
          max={max}
          theme={theme}
          hasErrors={hasErrors}
        ></Input>
        {type === "password" ? (
          <TogglePassword setInputType={setInputType}></TogglePassword>
        ) : null}
      </InputContainer>

      {hasErrors ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </Layout>
  );
};

export default InputField;
