import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const MovieNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-2">
      <Navbar.Brand as={Link} to="/" >
        MovieDB
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/addmovie">
            Add Movies
          </Nav.Link>
          <Nav.Link as={Link} to="/allmovies">
            Show All Movies
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MovieNav;
