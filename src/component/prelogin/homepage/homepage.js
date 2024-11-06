import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Form, Button } from 'react-bootstrap';
import "../login/login.css"
import Login from '../login/Login';
import Signup from "../signup/Signup"
function Home() {
    const [key, setKey] = useState('signup');
    return (
        <>
            <Container fluid className='m-0 p-0'>
                <Row className=''>
                    <Col md={6} className='m-0 p-0'>
                    <img className='login-left-section-image' src='/images/leftlogin.png' alt='login-left-image' />
                    </Col>
                    <Col md={6} className='p-5 m-0 p-0'>
                    <div className='login-right-section'>
                       {key==="login" && <h2 className='login-hi-heading'>Hi, There</h2>}
                    <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
                            <Nav fill variant="pills" className="mb-3 button-transparent border-radius">
                                <Nav.Item>
                                    <Nav.Link eventKey="login" className={key === 'login' ? 'button-active border-radius' : "text-dark"}>
                                        Login
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="signup" className={key === 'signup' ? 'button-active border-radius' : "text-dark"}>
                                        Signup
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="login">
                                    <Login />
                                </Tab.Pane>
                                <Tab.Pane eventKey="signup">
                                    <Signup />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home;