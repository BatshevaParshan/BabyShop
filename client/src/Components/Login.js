import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = ({ onLogin, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const url = "http://127.0.0.1:5000";
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const json = await response.json();
        const userData = json.user;
        onLogin(json.user_token, userData.username);
        window.alert("Login Successful")
        navigate("/login-success"); // Redirect to successful login page
      } else {
        const errorData = await response.json();
        window.alert(errorData.message);
        console.error("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }

    setSubmitting(false);
  };

  if (isLoggedIn) {
    // If user is already logged in, redirect to home page
    navigate("/");
    return null;
  }

  return (
    <div className="login-container">
      <h2 className="login-heading">Baby Shop Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          }
          if (!values.password) {
            errors.password = "Password is required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" className="input-field" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" className="input-field" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="login-button"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;