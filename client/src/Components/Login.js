import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin, isLoggedIn }) => {
  const history = useHistory();

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

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch('http://localhost:5555/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Login successful:', data);
        onLogin(data.user_id, data.username); // Assuming onLogin function is implemented
        history.push('/login-success'); // Redirect upon successful login using history
      } catch (error) {
        console.error('Error during login:', error);
        alert('Failed to login. Please check your credentials.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
        </div>
        <button type="submit" disabled={formik.isSubmitting} className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
