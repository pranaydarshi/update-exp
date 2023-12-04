import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginuser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  // const logouthandler = () => {
  //   localStorage.removeItem("user");
  //   navigate("/login  ");
  // };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Expanse Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
        // className="collapse navbar-collapse justify-content-end"
        // id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <p className="nav-link" aria-current="page">
                {loginuser && <span className="bold-text">Hello </span>}
                <span className="bold-text">{loginuser.name}</span>
              </p>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-primary"
                aria-current="page"
                onClick={() => {
                  localStorage.removeItem("user");
                  message.success("logout success");
                  navigate("/login  ");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
