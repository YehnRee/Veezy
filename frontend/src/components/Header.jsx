import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false); // Hide on scroll down
            } else {
                setShowNavbar(true); // Show on scroll up
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <Navbar 
            expand="lg" 
            bg="primary" 
            variant="dark" 
            collapseOnSelect 
            className={`navbar-transition ${showNavbar ? "navbar-visible" : "navbar-hidden"} position-relative`}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <i className="fa-solid fa-play"></i> Veezy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {userInfo ? (
                            userInfo.isAdmin ? (
                                <Nav.Link as={Link} to="/upload-video">
                                    <i className="fa-solid fa-play"></i> Upload
                                </Nav.Link>
                            ) : (
                                <Nav.Link as={Link} to="/subscription">
                                    <i className="fa-solid fa-dollar-sign"></i> Subscription
                                </Nav.Link>
                            )
                        ) : null}

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username" align="end">

                                    <NavDropdown.Item href='/profile'>
                                        <i className="fas fa-user"></i> Account
                                    </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>
                                    <i className="fas fa-sign-out"></i> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                <i className='fas fa-user'></i> Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
