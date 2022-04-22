import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./views/dashboard.views";
import { Login } from "./views/login.views";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
