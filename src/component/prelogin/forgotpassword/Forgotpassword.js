import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form'; // Import useForm from react-hook-form
import "./forgotpassword.css";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize React Hook Form
  
  const onSubmit = (data) => {
    // Handle submit action here
    navigate("/")
  };

  const handleLogin = () => {
    // Handle login action here, like redirecting to login page
    navigate("/")
  };

  return (
    <div className='forgot-password-background'>
      <Container fluid className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '28rem' }} className="shadow">
          <Card.Body>
            <Card.Title className="text-center mb-3">Forgot Password</Card.Title>
            <Form onSubmit={handleSubmit(onSubmit)}> {/* Hook up handleSubmit */}
              <Form.Group controlId="formEmail">
                <Form.Label>Please provide your registered email id to Reset Password</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required', // Validate required field
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, // Validate email pattern
                      message: 'Invalid email address'
                    }
                  })}
                  isInvalid={!!errors.email} // Highlight input if error
                />
                {/* Display error message if validation fails */}
                {errors.email && (
                  <Form.Text className="text-danger">{errors.email.message}</Form.Text>
                )}
              </Form.Group>
              <Row className="mt-4">
                <Col className="text-center d-flex justify-content-between">
                  <Button className='button-active' type="submit">
                    Reset Password
                  </Button>
                  <Button className='button-active' onClick={handleLogin}>
                    Login / Signup
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPassword;
