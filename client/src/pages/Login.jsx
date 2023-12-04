import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  //Form Submit
  const submitHandler = async (values) => {
    try {
      setloading(true);
      const { data } = await axios.post("/users/login", {
        email: values.Email,
        password: values.Password,
      });
      setloading(false);
      message.success("login success");
      localStorage.setItem("user", JSON.stringify({ ...data, password: "" }));
      navigate("/");
    } catch (error) {
      setloading(false);
      message.error("Login Invalid");
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
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Welcome To Login Page</h1>

          <Form.Item label="Email" name="Email">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Password" name="Password">
            <Input></Input>
          </Form.Item>
          <div className="d-flex flex-column align-items-center  ">
            <button className="btn btn-primary p-2 mb-4">Login</button>
            <Link to="/register"> Not Registered ? Click Here to Register</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
