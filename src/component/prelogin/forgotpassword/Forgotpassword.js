import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import "./forgotpassword.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    // Handle submit action here
    alert('Password reset link sent!');
  };

  const handleLogin = () => {
    // Handle login action here, like redirecting to login page
    alert('Redirecting to login page');
  };

  return (
<div className='forgot-password-background'>
<Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '28rem' }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-3">Forgot Password</Card.Title>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Please provide your registered email id to Reset Password</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Row className="mt-4 ">
              <Col className="text-center d-flex justify-content-between">
                <Button className='button-active' onClick={handleSubmit}>
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
