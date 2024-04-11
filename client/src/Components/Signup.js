import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import CSS for signup page styling

const Signup = ({ onSignup, isLoggedIn }) => {
  const navigate = useNavigate();

  const validate = values => {
    const errors = {};
    // Add validation rules for signup form fields (e.g., email, password, confirm password)
    return errors;
  };

  if (isLoggedIn) {
    navigate('/');
    return null; // Redirect to home page if user is already logged in
  }

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Create a Baby Shop Account</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          // Simulate signup with a dummy API call (replace with actual signup logic)
          setTimeout(() => {
            // Assuming signup is successful, set user info and redirect
            const userData = { user_id: 456, username: 'NewUser' };
            onSignup(userData.user_id, userData.username);
            navigate('/login-success'); // Redirect to successful signup page
            setSubmitting(false);
          }, 1000); // Simulated delay to mimic API call
        }}
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
