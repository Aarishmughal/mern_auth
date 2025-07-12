import axios from "axios";
import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = (props) => {
    const [username, setUsername] = useState();
    const [dob, setDob] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${props.API_URL}/register`, {
                username,
                dob,
                email,
                password,
            })
            .then((result) => {
                console.log(result);
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <Card
                    className="w-100"
                    style={{ maxWidth: 800, minWidth: 280 }}
                >
                    <Card.Body>
                        <h1 className="m-0" style={{ fontSize: 56 }}>
                            Register
                        </h1>
                        <p className="small">
                            Please fill the information in the form below.
                        </p>
                        <Form onSubmit={handleOnSubmit}>
                            <div className="row g-2 mb-2">
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        label="Username"
                                        className="w-100"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            name="username"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </FloatingLabel>
                                </div>
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        label="Date of Birth"
                                        className="w-100"
                                    >
                                        <Form.Control
                                            type="date"
                                            placeholder="Date of Birth"
                                            name="dob"
                                            value={dob}
                                            onChange={(e) =>
                                                setDob(e.target.value)
                                            }
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="row g-2 mb-2">
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        label="Email Address*"
                                        className="w-100"
                                    >
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Address"
                                            name="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </FloatingLabel>
                                </div>
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        label="Confirm Email Address*"
                                        className="w-100"
                                    >
                                        <Form.Control
                                            type="email"
                                            placeholder="Confirm Email Address"
                                            name="emailConfirmation"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="row g-2 mb-2">
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        label="Password*"
                                        className="w-100"
                                    >
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </FloatingLabel>
                                </div>
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        label="Confirm Password*"
                                        className="w-100"
                                    >
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="passwordConfirmation"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="mt-3 d-flex justify-content-center align-items-center gap-2">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 btn-lg"
                                >
                                    Register
                                </Button>
                                <Link to="/" className="w-100">
                                    <Button
                                        variant="secondary"
                                        className="w-100 btn-lg"
                                    >
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </Form>
                        <p className="m-0 mt-2 small">
                            Already Registered?{" "}
                            <Link to={"/login"}>Login Now</Link>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default Register;
