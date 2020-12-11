import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";



const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav.Link>
          <Link to='/courses' style={{ textDecoration:'none' , color: "white"  }}>Courses</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to='/add-course' style={{ textDecoration:'none' , color: "white"  }}>Add Course</Link>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )


}

export default Header;