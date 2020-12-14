import React from "react";
import { Link } from "react-router-dom";
import { Navbar , Nav } from 'react-bootstrap';



const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link>  <Link to='/courses' style={{ textDecoration:'none' , color: "white"  }}>Courses</Link></Nav.Link>
          <Nav.Link>  <Link to='/addcourse' style={{ textDecoration:'none' , color: "white"  }}>Add Course</Link></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )


}

export default Header;
