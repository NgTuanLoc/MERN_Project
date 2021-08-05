import { Container, Navbar, Nav } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

// rafce - react arrow function component export
const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Techshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/home">
                <FiShoppingCart
                  className="ms-10"
                  size={20}
                  style={{ margin: "-4px 2px 0 0 " }}
                />
                Cart
              </Nav.Link>
              <Nav.Link href="/link">
                <AiOutlineUser size={20} style={{ margin: "-4px 2px 0 0 " }} />
                User
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
