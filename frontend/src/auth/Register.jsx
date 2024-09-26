import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = ({ history }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({ name, email, password });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log("REGISTER USER ===> ", res);
      toast.success("Registered successfully ");
      navigate("/login");
    } catch (err) {
      console.log("Error in registration request:", err);

      if (err.response.status === 400) toast.error(err.response.data);
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
