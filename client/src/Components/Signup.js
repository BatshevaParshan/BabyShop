import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import CSS for signup page styling

const Signup = ({ onSignup, isLoggedIn }) => {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!values.role) {
      values.role = "User";
    }
    return errors;
  };

  if (isLoggedIn) {
    navigate("/");
    return null; // Redirect to home page if user is already logged in
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const url = "http://127.0.0.1:5000";
      const response = await fetch(`${url}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const json = await response.json();
        const userData = json.user;
        onSignup(json.user_token, userData.username);
        window.alert("Signup successful")
        navigate("/login-success"); // Redirect to successful signup page
      } else {
        const errorData = await response.json();
        window.alert(errorData.message);
        console.error("Signup failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Create a Baby Shop Account</h2>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            {/* Form fields for signup (e.g., email, password, confirm password) */}
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />

            <Field type="text" name="username" placeholder="Username" />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />

            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />

            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error-message"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="signup-button"
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;