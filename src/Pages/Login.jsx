import { useEffect, useRef } from "react";
import { useAuth } from "../Context/authContext";
import {useNavigate } from "react-router-dom";

function Login() {
  const { token } = useAuth();
  const { loginHandler, isLoginLoading } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    loginHandler(data);
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <input required name="username" placeholder="username" />
        <input required name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
      {isLoginLoading && <div>Loading....</div>}
    </>
  );
}
export default Login;
