import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./header.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Badge } from 'react-bootstrap';

function Header({ totalQuantity }) {
    return (
        <>
            {['xxl'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container>
                        <Navbar.Brand href="#">ShopLane</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-center flex-grow-1 pe-3">
                                    <Nav.Link className='mx-3'>Home</Nav.Link>
                                    <Nav.Link className='mx-3'>Clothing</Nav.Link>
                                    <Nav.Link className='mx-3'>Accessories</Nav.Link>
                                </Nav>
                                <div className="d-flex align-items-center">
                                    <img src='/images/search.png' alt='search-icon' className='header-image' />
                                    <div className='position-relative'>
                                    <img src='/images/cart.png' alt='cart-logo' className='header-image' />
                                    {totalQuantity > 0 && (
                                        <Badge pill variant="danger" className="position-absolute top-0 right-position">
                                            {totalQuantity}
                                        </Badge>
                                    )}
                                    </div>
                                    <img src='/images/user.png' alt='user-logo' className='header-image' />
                                </div>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default Header;