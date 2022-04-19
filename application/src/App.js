import { TextField } from "./components/FormComponents";
import { Formik, Form } from "formik";

function App() {
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        onSubmit={(e) => {
          console.log(e);
        }}
      >
        <Form>
          <TextField name="email" label="Email" />
          <TextField name="password" label="Password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
