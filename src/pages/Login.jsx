import axios from "axios";
import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = (props) => {
    const [inputValue, setInputValue] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                `${props.API_URL}/login`,
                inputValue,
                { withCredentials: true }
            );
            if (data.message === "User logged in successfully") {
                toast.success(data.message);
                setTimeout(() => navigate("/"), 1000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Server error");
        }
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
                                value={inputValue.email}
                                onChange={handleOnChange}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={inputValue.password}
                                onChange={handleOnChange}
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
                    <ToastContainer />
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
