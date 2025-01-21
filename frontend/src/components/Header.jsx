import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

function Header() {
    return (
        <Navbar expand="lg" bg='primary' variant='dark' collapseOnSelect>
            <Container>
                <Navbar.Brand href="/home"><i class="fa-solid fa-play"></i>     Veezy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i>     Browse</Nav.Link>
                        <Nav.Link href="/user"><i class="fa-solid fa-dollar-sign"></i>     Subscription</Nav.Link>
                        <NavDropdown title={<i class="fa-solid fa-ellipsis"></i>} id="basic-nav-dropdown" align='end'>
                            <NavDropdown.Item href="#action/3.1"><i className='fas fa-user'></i>    Account</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2"><i class="fas fa-cog"></i>   Settings</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3"><i class="fa-solid fa-question"></i>   About us</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4"><i class="fas fa-sign-out"></i>   Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header