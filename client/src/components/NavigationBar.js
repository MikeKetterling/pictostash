import {useHistory, Link, NavLink} from "react-router-dom"
import {Navbar, Container, Nav, Offcanvas, Button} from 'react-bootstrap'
import NavDropdownList from "./NavDropdownList"

function NavigationBar({user, setCurrentUser, albums, setActiveAlbum}) {
    const history = useHistory();

    const handleLogout = () => {
        fetch('/logout', {method: "DELETE"})
        .then(res => {
              if (res.ok) {
                setCurrentUser(null)
                history.push("/"); 
              }
            })
    }

console.log(albums)

    return(
        <>
            <Navbar bg="primary" expand={false}>
                <Container fluid>
                    {user ? <Navbar.Brand as={NavLink} to="/albumlist">Pictostash</Navbar.Brand> : <Navbar.Brand as={NavLink} to="/">Pictostash</Navbar.Brand>}
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Pictostash</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        {user ? <h4>Hello {user.username}!</h4> : null}
                        {user ? <Button onClick={handleLogout}>Logout</Button> : null}
                        {user ? <Link to="/albumlist">All Albums</Link> : null}
                        
                        {albums.length > 0 ? <NavDropdownList albums={albums} setActiveAlbum={setActiveAlbum} /> : null}

                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default NavigationBar;