import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const auth_API_URL = "http://localhost:3001/api/auth";
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={<Login API_URL={auth_API_URL} />}
                    />
                    <Route
                        path="/register"
                        element={<Register API_URL={auth_API_URL} />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
