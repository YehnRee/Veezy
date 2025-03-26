import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const WelcomeScreen = () => {
    return (
        <Container 
            className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
        >
            <h1>Welcome to Veezy</h1>
            <p>Join us to explore amazing content.</p>
            <Link to="/login">
                <Button variant="primary">Login</Button>
            </Link>
        </Container>
    );
};

export default WelcomeScreen;
