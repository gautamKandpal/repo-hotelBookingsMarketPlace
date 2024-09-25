import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, pasword });
    try {
      const res = await axios.post(`http://localhost:5000/api/register`, {
        name,
        email,
        password,
      });
      console.log("REGISTER USER ===> ", res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row"></div>
        <div className="col-md-6 offset-md-3">
          <RegisterForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            pasword={password}
            setPassword={setPassword}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
