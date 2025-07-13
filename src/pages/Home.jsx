import React from "react";
import { Card, Button } from "react-bootstrap";
import boxArrowInRight from "/assets/box-arrow-in-right.svg";
import databaseFillAdd from "/assets/database-fill-add.svg";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <Card style={{ width: "600px" }}>
                    <Card.Body>
                        <h1 style={{ fontSize: "56px" }}>Choose Operation</h1>
                        <div className="d-flex justify-content-around gap-3">
                            <Link
                                to="/login"
                                className="text-decoration-none w-100"
                            >
                                <Card
                                    className="text-start p-2 bg-success home-card"
                                    style={{ minHeight: "195px" }}
                                >
                                    <img
                                        src={boxArrowInRight}
                                        alt="box-arrow-in-right"
                                        width="120"
                                        height="120"
                                    />
                                    <h2 className="ms-2 text-white">
                                        Login{" "}
                                        <i className="bi bi-arrow-right"></i>
                                    </h2>
                                </Card>
                            </Link>
                            <Link
                                to="/register"
                                className="text-decoration-none w-100"
                            >
                                <Card
                                    className="text-start p-2 bg-primary home-card"
                                    style={{ minHeight: "195px" }}
                                >
                                    <img
                                        src={databaseFillAdd}
                                        alt="database-fill-add"
                                        width="120"
                                        height="120"
                                    />
                                    <h2 className="m-2 text-white">
                                        Register{" "}
                                        <i className="bi bi-arrow-right"></i>
                                    </h2>
                                </Card>
                            </Link>
                        </div>
                    </Card.Body>
                    <a
                        href="https://github.com/Aarishmughal/"
                        className="text-decoration-none"
                    >
                        <Card.Footer>
                            <p className="m-0 small">
                                A Simple Authentication Application Using{" "}
                                <strong>MERN Stack. </strong> <br />
                                Made By Muhammad Aarish Mughal
                            </p>
                        </Card.Footer>
                    </a>
                </Card>
            </div>
        </>
    );
};

export default Home;
