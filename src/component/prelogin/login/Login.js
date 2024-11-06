import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
    const navigate = useNavigate()
  const {
    register, // Register function for inputs
    handleSubmit, // Function to handle form submission
    formState: { errors }, // To track validation errors
  } = useForm();

  // Submit handler
  const onSubmit = (data) => {
    console.log(data);
    navigate('/dashboard')
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <Form.Group className="mb-3" controlId="formLoginEmail">
        <Form.Label className="label-style">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          className={`border-radius ${errors.email ? 'is-invalid' : ''}`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: 'Please enter a valid email',
            },
          })}
        />
        {/* Error message */}
        {errors.email && (
          <Form.Text className="text-danger">
            {errors.email.message}
          </Form.Text>
        )}
      </Form.Group>

      {/* Password Field */}
      <Form.Group className="mb-3" controlId="formLoginPassword">
        <Form.Label className="label-style">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          className={`border-radius ${errors.password ? 'is-invalid' : ''}`}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message:
                'Password must contain at least one lowercase letter, one uppercase letter, and one number',
            },
          })}
        />
        {/* Error message */}
        {errors.password && (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}
      </Form.Group>

      {/* Forgot Password Link */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/forgotPassword">Forgot Password</Link>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="btn-block w-100 border-radius button-active">
        Log me in
      </Button>
    </Form>
  );
};

export default Login;
