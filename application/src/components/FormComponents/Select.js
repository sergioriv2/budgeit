import { useField } from "formik";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  width: 100%;

  @media (min-width: 1024px) {
    max-width: 500px;
  }
`;

const Label = styled.label`
  margin: 5px 0;
  font-weight: 700;
  font-family: var(--title-font-2);
  font-size: 14px;
  color: var(--white-1);
  text-transform: uppercase;
`;

const SelectInput = styled.select`
  margin: 5px 0;
  font-family: inherit;
  cursor: pointer;
  border-radius: 5px;
  outline: 0;
  border: none;
  background-color: var(--black-2);
  color: var(--white-2);
  width: 100%;
  ${(props) => {
    switch (props.theme) {
      case "filter":
        return `
        padding: 10px 5px;
        `;
      default:
        return `
        padding: 15px 10px;
        &:focus {
          border: 2px solid #3096db;
        }`;
    }
  }};
`;

const ErrorMessage = styled.p`
  color: #4062cc;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
  margin-top: 10px;
  font-family: "Quicksand", sans-serif;
`;

const Select = ({ label, theme, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Layout>
      <Label>
        {/* <ImportantSpan>* </ImportantSpan> */}
        {label}
      </Label>
      <SelectInput
        {...field}
        {...props}
        selected={meta.touched}
        theme={theme}
      />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Layout>
  );
};

export default Select;
