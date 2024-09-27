import React, { useState } from "react";
import { toast } from "react-toastify";
import LoginForm from "../components/LoginForm";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    try {
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });
      console.log("LOGIN USER ==> ", res);
      if (res.data) {
        console.log("SAVE USER RES IN REDUX AND LOCAL STORAGE");
      }
      toast.success("Login Suceesfully");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.resonse.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>
      ;
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
