import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import './Signup.css'; // Import CSS for signup page styling

const Signup = ({ onSignup, isLoggedIn }) => {
  const history = useHistory();

  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  if (isLoggedIn) {
    history.push('/');
    return null; // Redirect to home page if user is already logged in
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const userData = await response.json();
        onSignup(userData.user_id, userData.username);
        history.push('/login-success'); // Redirect to successful signup page
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Create a Baby Shop Account</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Form fields for signup (e.g., email, password, confirm password) */}
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error-message" />
            
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error-message" />
            
            <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
            <ErrorMessage name="confirmPassword" component="div" className="error-message" />

            <button type="submit" disabled={isSubmitting} className="signup-button">
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
