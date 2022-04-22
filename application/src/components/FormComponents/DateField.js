import { useField, useFormikContext } from "formik";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > div > div > input {
    margin: 5px 0;
    font-family: inherit;
    cursor: pointer;
    border-radius: 5px;
    outline: 0;
    border: none;
    background-color: var(--black-2);
    color: var(--white-2);
    padding: 10px 15px;
    width: 160px;
  }
`;

const Label = styled.label`
  margin: 5px 0;
  font-weight: 500;
  font-size: 14px;
  color: var(--white-1);
  font-family: var(--title-font-2);
  text-transform: uppercase;
`;

const DateField = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField({ ...props });

  return (
    <Layout>
      <Label>{label}</Label>
      <DatePicker
        dateFormat={"dd/MM/yy"}
        {...field}
        {...props}
        locale={es}
        selected={field.value}
        onChange={(val) => setFieldValue(field.name, val)}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        strictParsing
      ></DatePicker>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Layout>
  );
};

export default DateField;
