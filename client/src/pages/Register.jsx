import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  //Form Submit
  const submitHandler = async (values) => {
    try {
      setloading(true);
      await axios.post("/users/register", {
        name: values.Name,
        email: values.Email,
        password: values.Password,
      });

      message.success("Registeration Successfull");
      setloading(false);
      navigate("/login");
    } catch (error) {
      setloading(false);
      message.error(error);
    }
  };
  //Prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page">
        {loading && <Spinner></Spinner>}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Page</h1>
          <Form.Item label="Name" name="Name">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Email" name="Email">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Password" name="Password">
            <Input></Input>
          </Form.Item>
          <div className="d-flex flex-column align-items-center">
            <button className="btn btn-primary p-2 mb-4">Register</button>
            <Link to="/login">Already Register ? Click Here to Login</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
