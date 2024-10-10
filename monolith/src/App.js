import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Pages/Login/LoginForm";
import Register from "./Pages/Register/SignUpForm";

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredential = true

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
