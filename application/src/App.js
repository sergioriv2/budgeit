import { TextField } from "./components/FormComponents";
import { Formik, Form } from "formik";
import { useCallback } from "react";
import axios from "axios";
import { Dashboard } from "./views/dashboard.views";

function App() {
  const submitDataAPI = useCallback((formData) => {
    axios({
      method: "POST",
      url: "http://localhost:3001/api/users/signin",
      data: {
        email: formData.email,
        password: formData.password,
      },
    }).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token);
      }
    });
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="App">
      {/* <Formik
        initialValues={initialValues}
        onSubmit={(formData) => submitDataAPI(formData)}
      >
        <Form>
          <TextField name="email" label="Email" />
          <TextField name="password" label="Password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik> */}
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
