import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, isLoggedIn }) => {
  const navigate = useNavigate();

  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // Simulate login with a dummy API call (replace with actual login logic)
    setTimeout(() => {
      // Assuming login is successful, set user info and redirect
      const userData = { user_id: 123, username: 'BabyUser' };
      onLogin(userData.user_id, userData.username);
      navigate('/login-success'); // Redirect to successful login page
      setSubmitting(false);
    }, 1000); // Simulated delay to mimic API call
  };

  if (isLoggedIn) {
    // If user is already logged in, redirect to home page
    navigate('/');
    return null;
  }

  return (
    <div className="login-container">
      <h2 className="login-heading">Baby Shop Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" className="input-field" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" className="input-field" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting} className="login-button">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
