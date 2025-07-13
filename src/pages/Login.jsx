import axios from "axios";
import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${props.API_URL}/login`, { email, password })
            .then((result) => {
                console.log(result);
                if (result.data === "Success") {
                    navigate("/");
                } else {
                    navigate("/register");
                    alert("You are not registered to this service.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: 400 }}>
                <Card.Body>
                    <h1 className="m-0" style={{ fontSize: 56 }}>
                        Login
                    </h1>
                    <p className="small">
                        Please fill the information in the form below.
                    </p>
                    <Form onSubmit={handleOnSubmit}>
                        <FloatingLabel label="Email Address" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FloatingLabel>
                        <div className="mt-3 d-flex justify-content-center align-items-center gap-2">
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 btn-lg btn-custom"
                            >
                                Login
                            </Button>
                            <Link to="/" className="w-100">
                                <Button
                                    variant="secondary"
                                    className="w-100 btn-lg btn-custom"
                                >
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </Form>
                    <p className="m-0 mt-2 small">
                        Not Already Registered?{" "}
                        <Link to={"/register"}>Register Now</Link>
                    </p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
