import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useEffect } from "react";
import { useAuth } from "./Context/authContext";
import { jwtDecode } from "jwt-decode";

function App() {
  const { token, setToken } = useAuth();

  const navigate = useNavigate();
  useEffect(() => navigate("/dashboard"), []);

  useEffect(() => {
    let interval;

    if (token) {
      interval = setInterval(() => {
        const decodedToken = jwtDecode(token); // Decode the token to get exp
        const expirationTime = decodedToken.exp * 1000 - Date.now();

        if (expirationTime <= 0) {
          setToken("");
          localStorage.removeItem("token");
          alert("Logged out");
          return () => clearInterval(interval);
        } else {
          console.log(
            "I AM interval: ",
            Math.floor(expirationTime / (1000 * 60)),
            ":",
            Math.floor((expirationTime % (1000 * 60)) / 1000)
          );
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [token]);

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
